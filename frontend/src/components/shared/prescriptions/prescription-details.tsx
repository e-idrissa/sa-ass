import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { FileTextIcon, InfoIcon } from "lucide-react";
import { AppLogo } from "../app-logo";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  prescription: IPrescription;
}

export function PrescriptionDetails({ prescription }: Props) {
  const { id, doctor, patient, drugDosage, recordUrl } = prescription;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <InfoIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <AppLogo />
          <SheetTitle className="flex items-center gap-2">
            Prescription{" "}
            <div className="flex items-center rounded-md border-2 px-2 py-1 gap-2">
              <span className="text-sm text-blue-600">{id}</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            View details about your appointment.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-4 px-4">
          <div className="flex gap-[1.30rem]">
            <span className="font-medium">Doctor:</span>
            <div className="flex flex-col px-2 py-1 rounded-lg bg-sidebar border">
              <code className="text-muted-foreground">{doctor.name}</code>
              <code className="text-muted-foreground">{doctor.email}</code>
            </div>
          </div>
          <div className="flex gap-[1.30rem]">
            <span className="font-medium">Patient:</span>
            <div className="flex flex-col px-2 py-1 rounded-lg bg-sidebar border">
              <code className="text-muted-foreground">{patient.name}</code>
              <code className="text-muted-foreground">{patient.email}</code>
            </div>
          </div>
          <div className="mt-2 font-medium flex gap-2">
            <FileTextIcon className="text-blue-600" />
            Dosage
          </div>
          <Table className="w-full">
            <TableCaption>A list of your drugs.</TableCaption>
            <TableHeader className="bg-sidebar">
              <TableRow>
                <TableHead className="pl-4 w-3/5">Drugs</TableHead>
                <TableHead className="text-center">Frequency</TableHead>
                <TableHead className="text-center">Period</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {drugDosage.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="pl-4 text-muted-foreground">
                    <code>{d.drug}</code>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    <code>{d.frequency}</code>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    <code>{d.day}</code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Card className="bg-transparent p-0">
            <CardContent className="flex items-center p-4 gap-2">
              <FileTextIcon className="text-blue-600 size-20 stroke-1" />
              <div className="flex flex-col w-full gap-2">
                <span className="text-sm">
                  Available in <code className="text-blue-500">.pdf</code>{" "}
                  format
                </span>
                <Button size={"sm"} className="w-full">Download</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
