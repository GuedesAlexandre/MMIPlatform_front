import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const AccordionControlTable = () => {
    
  return (
    <div>
        <Table className="border">
            <TableHeader>
                <TableRow>
                    <TableHead>Nom du contrôle</TableHead>
                    <TableHead>Coefficient</TableHead>
                    <TableHead>Modifer</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Faire le .map */}
            </TableBody>
        </Table>
    </div>
  );
};
export default AccordionControlTable;
