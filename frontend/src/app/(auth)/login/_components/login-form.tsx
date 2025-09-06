"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Eye, EyeClosed, Loader2, CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { PasswordStrength } from "@/components/shared/password-strength";
import { useLogin } from "@/hooks/auth";
import { getErrorMessage } from "@/api/types/errors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type PasswordFieldProps = {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    "password"
  >;
};

const PasswordInput = ({ field }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="pr-10"
          {...field}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            type="button"
            className="bg-none"
            variant={"ghost"}
            size={"icon"}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeClosed className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();
  const loginMutation = useLogin();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid } = form.formState;
  const isSubmitting = loginMutation.isPending;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setError(null);
    
    try {
      const result = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
      
      if (result.code === 200 && result.result) {
        // Update auth context
        login(result.result.accessToken, {
          sub: result.result.sub,
          email: result.result.email,
          role: result.result.role,
        });
        
        // Successful login - redirect based on user role
        const userRole = result.result.role;
        if (userRole === 'admin') {
          router.push('/admin/analytics');
        } else {
          router.push('/');
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{"Email"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={"user@gmail.com"}
                  type={"email"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{"Password"}</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <PasswordStrength password={field.value} />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Link
            href={"/forgot-password"}
            className="text-blue-500 text-sm hover:underline"
          >
            Forget password?
          </Link>
        </div>
        
        {error && (
          <Alert variant="error" className="mb-4">
          <CircleXIcon className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        )}
        
        <Button
          type="submit"
          size="sm"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <Loader2 className="size-4 mr-2 animate-spin" />
              <i>Submitting...</i>
            </span>
          ) : (
            <span className="flex items-center">
              <span>Login</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};
