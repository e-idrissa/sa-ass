"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

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

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export const EmailForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
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
              <span>Submit</span>
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
};
