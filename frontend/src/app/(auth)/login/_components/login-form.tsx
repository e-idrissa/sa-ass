"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { Eye, EyeClosed, Loader2 } from "lucide-react";

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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("LOGIN FORM VALUES", values);
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
        <Button
          type="submit"
          size="sm"
          className="w-full"
          onChangeCapture={form.handleSubmit(onSubmit)}
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
