"use client";

import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  HeartPulseIcon,
  Loader2,
  StethoscopeIcon,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { useState } from "react";
import { bloodGroups, specialities } from "@/lib/constants";
import { SheetClose, SheetFooter } from "../ui/sheet";

interface Props {
  user: IUserInfos;
  onSheet: boolean;
}

const FormSchema = z.object({
  role: z.string().min(1, {
    message: "Patient is is required",
  }),
  isVerified: z.boolean(),
  matricule: z.string().min(1, {
    message: "Matricule is is required",
  }),
  email: z.string().min(1, {
    message: "Email is is required",
  }),
  firstName: z.string().min(1, {
    message: "First Name is is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is is required",
  }),
  dob: z.date(),
  sex: z.string().min(1, {
    message: "Sex is is required",
  }),
  telephone: z.string().min(1, {
    message: "Telephone is is required",
  }),
  emergencyContact: z.string().min(1, {
    message: "Emergency contact is is required",
  }),
  height: z.string().min(1, {
    message: "Height is is required",
  }),
  pound: z.string().min(1, {
    message: "Pound is is required",
  }),
  bloodGroup: z.string().min(1, {
    message: "Blood group is is required",
  }),
  speciality: z.string(),
});

export const EditUserForm = ({ user, onSheet }: Props) => {
  const [open, setOpen] = useState(false);
  const names = user.user.split(" ");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: user.role || "",
      isVerified: user.isVerified || false,
      matricule: user.matricule.toString() || "",
      email: user.email || "",
      firstName: names[0] || "",
      lastName: names[1] || "",
      dob: user.dateOfBirth || undefined,
      sex: user.sex || "",
      telephone: user.telephone || "",
      emergencyContact: user.emergencyContact || "",
      height: user.height || "",
      pound: user.pound || "",
      bloodGroup: user.bloodGroup || "",
      speciality: user.speciality || "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    return console.log("FROM EDIT USER FORM", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between size-full">
        <div className={cn("space-y-6", onSheet ? "px-4" : "")}>
          {!onSheet && (
            <div className="bg-sidebar-accent py-2 px-3 rounded-lg flex items-center gap-2">
              {user.role === "patient" ? (
                <>
                  <HeartPulseIcon className="size-4" /> Patient
                </>
              ) : (
                <>
                  <StethoscopeIcon className="size-4" /> Doctor
                </>
              )}
            </div>
          )}
          <div className={cn("flex items-center gap-4")}>
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Email"}</FormLabel>
                  <FormControl>
                    <Input disabled type={"email"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"matricule"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Matricule"}</FormLabel>
                  <FormControl>
                    <Input disabled type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            className={cn(
              "flex items-center gap-4",
              onSheet ? "flex-col" : "flex-row"
            )}
          >
            <FormField
              control={form.control}
              name={"firstName"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"First Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Eddy"} type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"lastName"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Last Name"}</FormLabel>
                  <FormControl>
                    <Input placeholder={"Idrissa"} type={"text"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={cn("flex items-center gap-4")}>
            <FormField
              control={form.control}
              name={"dob"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Date of Birth"}</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
                      align="center"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"sex"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Sex"}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Select a drug"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"m"}>Male</SelectItem>
                      <SelectItem value={"f"}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className={cn("flex items-center gap-4")}>
            <FormField
              control={form.control}
              name={"telephone"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Telephone"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"0994371010"}
                      type={"number"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"emergencyContact"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Emergency Contact"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"0994371010"}
                      type={"number"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className={cn("flex items-center gap-4")}>
            <FormField
              control={form.control}
              name={"height"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Height"}</FormLabel>
                  <FormControl>
                    <Input placeholder={"180"} type={"number"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"pound"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Pound"}</FormLabel>
                  <FormControl>
                    <Input placeholder={"76.58"} type={"number"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"bloodGroup"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Blood Group"}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Select a speciality"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodGroups.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          {user.role !== "patient" && (
            <FormField
              control={form.control}
              name={"sex"}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{"Speciality"}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Select a speciality"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialities.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
        </div>
        {onSheet ? (
          <SheetFooter>
            <Button
              type="submit"
              size="sm"
              className="w-full self-end"
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
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        ) : (
          <Button
            type="submit"
            size="sm"
            className="w-full mt-6"
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
        )}
      </form>
    </Form>
  );
};
