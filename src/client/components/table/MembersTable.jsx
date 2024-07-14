import React, { useState, useEffect } from "react";
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

const houseColors = {
  innovators: {
    label: "Innovators",
    color: "hsl(var(--chart-1))",
  },
  sentinels: {
    label: "Sentinels",
    color: "hsl(var(--chart-2))",
  },
  cybernetics: {
    label: "Cybernetics",
    color: "hsl(var(--chart-3))",
  },
  chronos: {
    label: "Chronos",
    color: "hsl(var(--chart-4))",
  },
};

const columns = [
  {
    accessorKey: "STUDENTNUMBER",
    Header: "Student Number",
    cell: (props) => <Badge>{props.getValue()}</Badge>,
  },
  {
    accessorKey: "STUDENTNAME",
    Header: "Full Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "HOUSENAME",
    Header: "House",
    cell: (props) => {
      const houseName = props.getValue().toLowerCase();
      const houseInfo = houseColors[houseName] || {
        label: houseName,
        color: "hsl(var(--default-color))",
      }; // Fallback color
      return (
        <Badge variant="secondary" style={{ backgroundColor: houseInfo.color }}>
          <p>{houseInfo.label}</p>
        </Badge>
      );
    },
  },
  {
    accessorKey: "STUDENTYEAR",
    Header: "Year Level",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "STUDENTPROGRAM",
    Header: "Program",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

const MembersTable = () => {
  useEffect(() => {
    const GetStudents = async () => {
      try {
        const response = await fetch("/getMemberList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const studentData = await response.json();
        setData(studentData);
      } catch (error) {
        console.error("error:", error);
      }
    };
    GetStudents();
  }, []);

  const [data, setData] = useState([]);
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members List</CardTitle>
        <CardDescription>The official roster of CCIS Week 2024</CardDescription>
        <div className="flex flex-wrap items-center py-4 gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search student by name..."
              value={table.getColumn("STUDENTNAME")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table
                  .getColumn("STUDENTNAME")
                  ?.setFilterValue(event.target.value)
              }
              className="w-full rounded-lg bg-background pl-8 md:w-[222px] lg:w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex ml:0 sm:ml-auto">
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
      </CardHeader>
      <CardContent className="h-[45vh] sm:h-[50vh] max-h-full w-full overflow-auto">
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
      </CardContent>
      <CardFooter className="block">
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
      </CardFooter>
    </Card>
  );
};

export default MembersTable;
