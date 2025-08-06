"use client";

import { Dispatch, SetStateAction, useState } from "react";
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
import { PasswordStrength } from "@/components/shared/password-strength";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type PasswordFieldProps = {
  field: ControllerRenderProps<
    {
      passwordConfirmation: string;
      password: string;
      previousPassword: string;
    },
    "password" | "passwordConfirmation" | "previousPassword"
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
  previousPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  passwordConfirmation: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const PasswordForm = ({ setIsOpen }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      previousPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("LOGIN FORM VALUES", values);
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name={"previousPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {"Previous Password"}
              </FormLabel>
              <FormControl>
                <Input placeholder={"••••••••"} type={"password"} {...field} />
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
        <FormField
          control={form.control}
          name={"passwordConfirmation"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{"Confirm Password"}</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <PasswordStrength password={field.value} />
            </FormItem>
          )}
        />
          <Button
            type="submit"
            size="sm"
            className="w-full mt-4"
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
                <span>Submit</span>
              </span>
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant={"secondary"} className="w-full" size={"sm"}>
              Cancel
            </Button>
          </DrawerClose>
      </form>
    </Form>
  );
};
