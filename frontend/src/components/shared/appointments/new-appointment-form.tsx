"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CalendarIcon,
  ChevronDownIcon,
  CircleCheckIcon,
  CircleXIcon,
  ClockIcon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn, formatDate } from "@/lib/utils";

interface Props {
  role: string;
  patientId?: string;
  doctorId?: string;
  users: IUsersTableData[];
}

const FormSchema = z.object({
  patientId: z.string().min(2, {
    message: "PatientId must be at least 2 characters.",
  }),
  doctorId: z.string().min(3, {
    message: "First name must be at least 3 characters.",
  }),
  reason: z.string().min(3, {
    message: "Last name must be at least 3 characters.",
  }),
  date: z.date(),
});

export const NewAppointmentForm = ({
  patientId,
  doctorId,
  role,
  users,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const patients = users.filter((user) => user.role === "patient");
  const doctors = users.filter((user) => user.role === "doctor");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      patientId: patientId || "",
      doctorId: doctorId || "",
      reason: "",
      date: undefined,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("NEW USER FORM VALUES", values);
  };

  const res: string = "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>New User</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing
        </CardDescription>
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
            {role === "patient" ? (
              <FormField
                control={form.control}
                name={"doctorId"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {doctors.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.user}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name={"patientId"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.user}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name={"reason"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{"First Name"}</FormLabel>
                  <FormControl className="w-full">
                    <Textarea
                      placeholder={"Add the reason of this appointment"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"date"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{"Last Name"}</FormLabel>
                  <div className="flex gap-4">
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[60%] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value)
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <div className="relative w-[40%]">
                      <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="10:30:00"
                        className="inset-0 z-10 w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                      />
                      <ClockIcon className="absolute right-2 top-[0.6rem] size-4 opacity-30" />
                    </div>
                  </div>
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
