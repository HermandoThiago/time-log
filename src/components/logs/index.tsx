import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Logs() {
  return (
    <div>
      <Table>
        <TableCaption>List of logs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Date</TableHead>
            <TableHead className="w-1/3">Hour</TableHead>
            <TableHead className="w-1/3">Note</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{new Date().toDateString()}</TableCell>
            <TableCell>10</TableCell>
            <TableCell className="text-right">
              This is a place holder.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}