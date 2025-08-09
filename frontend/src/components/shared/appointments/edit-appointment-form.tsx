import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  ClockIcon,
  Loader2,
  PenIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { usersTableData } from "@/lib/tmp/table-data";
import { cn, formatDate } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  appointment: IAppointment;
  userId: string;
}

const FormSchema = z.object({
  creatorId: z.string().min(2, {
    message: "Patient is is required",
  }),
  patientId: z.string().min(2, {
    message: "Patient is is required",
  }),
  doctorId: z.string().min(2, {
    message: "Doctor is is required",
  }),
  reason: z.string().min(2, {
    message: "reason must be at least 2 characters",
  }),
  date: z.date(),
  status: z.string().min(2, {
    message: "Status must be at least 2 characters",
  }),
});

export function EditAppointmentForm({ appointment, userId }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      creatorId: appointment.creatorId,
      patientId: appointment.patient.id,
      doctorId: appointment.doctor.id,
      reason: appointment.reason,
      date: appointment.date,
      status: appointment.status,
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    return console.log("FROM EDIT APPOINTMENT FORM", values);
  };

  const patients = usersTableData.filter((user) => user.role === "patient");
  // const doctors = usersTableData.filter((user) => user.role === "doctor");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <PenIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Appointment</SheetTitle>
          <SheetDescription>
            Make changes to your appoointment here. Click save when you&apos;re
            done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full justify-between">
            <div className="px-4 space-y-4">
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
                      <PopoverContent className="w-70 p-0">
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
            </div>
            <SheetFooter>
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
                    <i>Saving...</i>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <span>Save changes</span>
                  </span>
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline" type="button">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
