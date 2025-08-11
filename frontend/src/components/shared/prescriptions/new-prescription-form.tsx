"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  CircleCheckIcon,
  CircleXIcon,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { drugsData, usersTableData } from "@/lib/tmp/table-data";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  id: string;
}

const FormSchema = z.object({
  creatorId: z.string().min(1, {
    message: "Creator is required.",
  }),
  doctorId: z.string().min(1, {
    message: "Doctor is required.",
  }),
  patientId: z.string().min(1, {
    message: "Patient is required.",
  }),
  drugId1: z.string().min(1, {
    message: "Drug is required.",
  }),
  freq1: z.string().min(1, {
    message: "Drug Frequency is required.",
  }),
  per1: z.string().min(1, {
    message: "Drug Period is required.",
  }),
  drugId2: z.string(),
  freq2: z.string(),
  per2: z.string(),
  drugId3: z.string(),
  freq3: z.string(),
  per3: z.string(),
  drugId4: z.string(),
  freq4: z.string(),
  per4: z.string(),
  drugId5: z.string(),
  freq5: z.string(),
  per5: z.string(),
});

export const NewPrescriptionForm = ({ id }: Props) => {
  const drugs = drugsData;
  const patients = usersTableData.filter((user) => user.role === "patient");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      creatorId: id,
      doctorId: id,
      patientId: "",
      drugId1: "",
      freq1: "",
      per1: "",
      drugId2: "",
      freq2: "",
      per2: "",
      drugId3: "",
      freq3: "",
      per3: "",
      drugId4: "",
      freq4: "",
      per4: "",
      drugId5: "",
      freq5: "",
      per5: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log("NEW USER FORM VALUES", values);
  };

  const res: string = "";

  return (
    <CardContent>
      {res === "" ? null : res === "success" ? (
        <Alert variant="success" className="mb-4">
          <CircleCheckIcon className="size-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Prescription created successfully</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="error" className="mb-4">
          <CircleXIcon className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to create prescription</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <CardContent className="border rounded-lg p-4 flex flex-col space-y-4">
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name={"drugId1"}
                render={({ field }) => (
                  <FormItem className="w-3/6">
                    <FormLabel>{"Drug 1"}</FormLabel>
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
                        {drugs.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"freq1"}
                render={({ field }) => (
                  <FormItem className="w-2/6">
                    <FormLabel>{"Frequency"}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"4:1"}>4 x 1</SelectItem>
                        <SelectItem value={"3:1"}>3 x 1</SelectItem>
                        <SelectItem value={"2:1"}>4 x 1</SelectItem>
                        <SelectItem value={"1:1"}>4 x 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"per1"}
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel>{"Period"}</FormLabel>
                    <FormControl>
                      <Input placeholder={"3"} type={"number"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name={"drugId2"}
                render={({ field }) => (
                  <FormItem className="w-3/6">
                    <FormLabel>{"Drug 2"}</FormLabel>
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
                        {drugs.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"freq2"}
                render={({ field }) => (
                  <FormItem className="w-2/6">
                    <FormLabel>{"Frequency"}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"4:1"}>4 x 1</SelectItem>
                        <SelectItem value={"3:1"}>3 x 1</SelectItem>
                        <SelectItem value={"2:1"}>4 x 1</SelectItem>
                        <SelectItem value={"1:1"}>4 x 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"per2"}
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel>{"Period"}</FormLabel>
                    <FormControl>
                      <Input placeholder={"3"} type={"text"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name={"drugId3"}
                render={({ field }) => (
                  <FormItem className="w-3/6">
                    <FormLabel>{"Drug 3"}</FormLabel>
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
                        {drugs.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"freq3"}
                render={({ field }) => (
                  <FormItem className="w-2/6">
                    <FormLabel>{"Frequency"}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"4:1"}>4 x 1</SelectItem>
                        <SelectItem value={"3:1"}>3 x 1</SelectItem>
                        <SelectItem value={"2:1"}>4 x 1</SelectItem>
                        <SelectItem value={"1:1"}>4 x 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"per3"}
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel>{"Period"}</FormLabel>
                    <FormControl>
                      <Input placeholder={"3"} type={"number"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name={"drugId4"}
                render={({ field }) => (
                  <FormItem className="w-3/6">
                    <FormLabel>{"Drug 4"}</FormLabel>
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
                        {drugs.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"freq4"}
                render={({ field }) => (
                  <FormItem className="w-2/6">
                    <FormLabel>{"Frequency"}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"4:1"}>4 x 1</SelectItem>
                        <SelectItem value={"3:1"}>3 x 1</SelectItem>
                        <SelectItem value={"2:1"}>4 x 1</SelectItem>
                        <SelectItem value={"1:1"}>4 x 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"per4"}
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel>{"Period"}</FormLabel>
                    <FormControl>
                      <Input placeholder={"3"} type={"number"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4 w-full">
              <FormField
                control={form.control}
                name={"drugId5"}
                render={({ field }) => (
                  <FormItem className="w-3/6">
                    <FormLabel>{"Drug 5"}</FormLabel>
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
                        {drugs.map((d) => (
                          <SelectItem key={d.id} value={d.id}>
                            {d.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"freq5"}
                render={({ field }) => (
                  <FormItem className="w-2/6">
                    <FormLabel>{"Frequency"}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={"Select"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"4:1"}>4 x 1</SelectItem>
                        <SelectItem value={"3:1"}>3 x 1</SelectItem>
                        <SelectItem value={"2:1"}>4 x 1</SelectItem>
                        <SelectItem value={"1:1"}>4 x 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"per5"}
                render={({ field }) => (
                  <FormItem className="w-1/6">
                    <FormLabel>{"Period"}</FormLabel>
                    <FormControl>
                      <Input placeholder={"3"} type={"number"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
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
  );
};
