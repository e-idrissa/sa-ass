import { TableBadge } from "@/components/shared/table-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { homeTableData } from "@/lib/tmp/table-data";
import { formatDate } from "@/lib/utils";

interface Props {
  role: string;
}

export const Hometable = ({ role }: Props) => {
  const data = homeTableData;

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>
          <h3 className="text-xl text-semibold">Recent Appointments</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableCaption>A list of your recent appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-50">
                {role === "ADMIN" ? "Patient" : "Docteur"}
              </TableHead>
              <TableHead className="">Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Created At</TableHead>
              <TableHead className="">Updated At</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell className="flex flex-col">
                  <p className="font-medium">{row.user}</p>
                  <p className="text-xs text-muted-foreground">{row.email}</p>
                </TableCell>
                <TableCell>
                  <TableBadge variant={row.status} />
                </TableCell>
                <TableCell className="align-middle h-full">{row.reason}</TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{formatDate(row.updatedAt)}</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
