import React, { useState, useEffect } from "react";
import SelectEvent from "../SelectEvent";
import AddPlayerForm from "../forms/AddPlayerForm";
import ActionsForm from "../forms/PlayerActionsForm";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";

import { ChevronDown, Search, ListFilter } from "lucide-react";

const tabs = [
  { label: "Day 1", ordinal: "first", value: "1", date: "June 25, 2024" },
  { label: "Day 2", ordinal: "second", value: "2", date: "June 26, 2024" },
  { label: "Day 3", ordinal: "third", value: "3", date: "June 27, 2024" },
  { label: "Day 4", ordinal: "fourth", value: "4", date: "June 28, 2024" },
  { label: "Day 5", ordinal: "fifth", value: "5", date: "June 29, 2024" },
];

// todo: replace columns to player list table
const columns = [
  {
    accessorKey: "EVENTNAME",
    Header: "Event Name",
    cell: (props) => <Badge>{props.getValue()}</Badge>,
  },
  {
    accessorKey: "PLAYERNAME",
    Header: "Player Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "HOUSENAME",
    Header: "House",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "STUDENTYEAR",
    Header: "Year Level",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "STUDENTNUMBER",
    id: "ACTIONS",
    Header: "Actions",
    cell: (props) => <ActionsForm studentNumber={props.getValue()} />,
  },
];

const PlayersTable = () => {
  const [selectedDay, setSelectedDay] = useState("1"); // Defaults to the first tab, which is Day 1
  const [eventsData, setEventsData] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("Event");
  const selectedTab = tabs.find((tab) => tab.value === selectedDay);
  const selectedDate = selectedTab ? selectedTab.date : "N/A";
  const selectedOrdinal = selectedTab ? selectedTab.ordinal : "N/A";

  const handleEventSelectID = (event) => {
    setSelectedEventID(event);
  };

  const handleEventSelectName = (event) => {
    setSelectedEventName(event);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/getEventList?day=${selectedDay}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setEventsData(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchEvents();
  }, [selectedDay]); // Dependency array includes selectedDay to trigger effect on change

  useEffect(() => {
    const GetPlayers = async () => {
      try {
        const response = await fetch(
          `/getPlayerList?eventID=${selectedEventID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const playerList = await response.json();
        setData(playerList);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    GetPlayers();
  }, [selectedEventID]);

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
    <Tabs defaultValue="1">
      <div className="flex items-center justify-center sm:justify-start">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => setSelectedDay(tab.value)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Select Event
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {eventsData.map((event) => (
                <DropdownMenuItem
                  key={event.EVENTID}
                  onClick={() => {
                    handleEventSelectID(event.EVENTID);
                    handleEventSelectName(event.EVENTNAME);
                  }}
                >
                  {event.EVENTNAME}
                </DropdownMenuItem>
              ))}
              {/* <DropdownMenuCheckboxItem onClick={() => handleEventSelect('2')}>Event1</DropdownMenuCheckboxItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          <AddPlayerForm />
        </div>
      </div>
      <TabsContent value={selectedDay}>
        <Card>
          <CardHeader>
            <CardTitle>{`${selectedEventName}: Players List`}</CardTitle>
            <CardDescription>
              {`The official players of the ${selectedEventName} on the ${selectedOrdinal} day. (${selectedDate})`}
            </CardDescription>
            <div className="flex items-center py-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search player by name..."
                  value={table.getColumn("PLAYERNAME")?.getFilterValue() ?? ""}
                  onChange={(event) =>
                    table
                      .getColumn("PLAYERNAME")
                      ?.setFilterValue(event.target.value)
                  }
                  className="w-full rounded-lg bg-background pl-8 md:w-[222px] lg:w-[300px]"
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
          </CardHeader>
          <CardContent className="h-[35vh] sm:h-[55vh] max-h-full w-full overflow-auto">
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
            <div className="flex items-center space-x-2 py-4 sm:justify-end">
              <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
                Showing <strong>{startRow}</strong> to <strong>{endRow}</strong>{" "}
                of <strong>{totalRows}</strong> player(s).
              </div>
              <div className="flex space-x-2">
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
      </TabsContent>
    </Tabs>
  );
};

export default PlayersTable;
