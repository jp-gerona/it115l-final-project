import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import testData from "../../../server/testData";

import { Badge } from "@/client/components/ui/badge";
import { Input } from "@/client/components/ui/input";
import { Button } from "@/client/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/client/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";

import { ChevronDown, Search } from "lucide-react";

// todo: make this dynamic according to oracledb data instead of test data

const columns = [
  {
    accessorKey: "studentNumber",
    Header: "Student Number",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "studentName",
    Header: "Full Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "studentYear",
    Header: "Year Level",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "studentProgram",
    Header: "Program",
    cell: (props) => <Badge variant="outline">{props.getValue()}</Badge>,
  },
];

const MembersTable = () => {
  const [data, setData] = useState(testData);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const currentPage = table.getState().pagination.pageIndex; // Get the current page index, assuming 0-based index
  const pageSize = table.getState().pagination.pageSize; // Get the number of rows per page
  const totalRows = table.getFilteredRowModel().rows.length; // Total number of rows after filtering

  // Calculate the starting and ending row numbers for the current page
  const startRow = currentPage * pageSize + 1;
  const endRow = Math.min((currentPage + 1) * pageSize, totalRows);

  // todo: In this component, add API GET method for displaying members.

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members List</CardTitle>
        <CardDescription>The official roster of CCIS Week 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter student by name..."
              value={table.getColumn("studentName")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("studentName")
                  ?.setFilterValue(event.target.value)
              }
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto hidden sm:flex">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id?.toString().replace(/Student/gi, "") || ""}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.Header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <p className="text-destructive font-semibold">
                    No records found
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center  space-x-2 py-4 sm:justify-end">
          <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
            Showing <strong>{startRow}</strong> to <strong>{endRow}</strong> of{" "}
            <strong>{totalRows}</strong> student(s).
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembersTable;
