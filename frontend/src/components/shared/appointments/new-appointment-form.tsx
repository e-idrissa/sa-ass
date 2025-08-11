"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CalendarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
        <CardTitle>New Appointment</CardTitle>
        <CardDescription>
          Enter your appointment details here. Click save when you&apos;re done.
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
            {role === "admin" || role === "doctor" ? (
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Patient</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? patients.find(
                                  (patient) => patient.id === field.value
                                )?.user
                              : "Select a patient"}
                            <ChevronsUpDownIcon className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-100 p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search a patient"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No patients found.</CommandEmpty>
                            <CommandGroup>
                              {patients.map((p) => (
                                <CommandItem
                                  key={p.id}
                                  value={p.user}
                                  onSelect={() => {
                                    form.setValue("patientId", p.id);
                                  }}
                                >
                                  {p.user}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      p.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Doctor</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? doctors.find(
                                  (doctor) => doctor.id === field.value
                                )?.user
                              : "Select a doctor"}
                            <ChevronsUpDownIcon className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-100 p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search a doctor"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No doctors found.</CommandEmpty>
                            <CommandGroup>
                              {doctors.map((d) => (
                                <CommandItem
                                  key={d.id}
                                  value={d.user}
                                  onSelect={() => {
                                    form.setValue("doctorId", d.id);
                                  }}
                                >
                                  {d.user}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto",
                                      d.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
