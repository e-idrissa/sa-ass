"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleCheckIcon, CircleXIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  role: string;
}

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  firstName: z.string().min(3, {
    message: "First name must be at least 3 characters.",
  }),
  lastName: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  role: z.string().min(3, {
    message: "Role must be at least 3 characters.",
  }),
});

export const NewUserForm = ({ role }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: role,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("NEW USER FORM VALUES", values);
  };

  const res: string = ""

  return (
    <Card>
      <CardHeader>
        <CardTitle>New User</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing</CardDescription>
      </CardHeader>
      <CardContent>
        {res === "" ? null : res === "success" ? (
          <Alert variant="success" className="mb-4">
            <CircleCheckIcon className="size-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>User created successfully</AlertDescription>
          </Alert>
        ) : (
          <Alert variant="error" className="mb-4">
            <CircleXIcon className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to create user</AlertDescription>
          </Alert>
        )}
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
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={"firstName"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{"First Name"}</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder={"First Name"}
                        type={"text"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"lastName"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{"Last Name"}</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder={"Last Name"}
                        type={"text"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={true}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-4"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="doctor" />
                        </FormControl>
                        <FormLabel className="font-normal">Doctor</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="patient" />
                        </FormControl>
                        <FormLabel className="font-normal">Patient</FormLabel>
                      </FormItem>
                    </RadioGroup>
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
                  <span>Create</span>
                </span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
