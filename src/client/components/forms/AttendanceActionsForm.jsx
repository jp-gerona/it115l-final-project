import React, { useState } from "react";

import { Button } from "@/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/client/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";

import { MoreHorizontal } from "lucide-react";

const AttendanceActionsForm = ({ studentNumber }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [newData, setNewData] = useState({
    newEventID: "",
    newStudentNumber: "",
    newHouseName: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewData({ ...newData, [id]: value });
  };

  const handleEdit = async (studentNumber) => {
    try {
      const response = await fetch("/editAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentNumber, newData })
      });
  
      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse); // Parse error message from response
      }
    } catch (error) {
      console.error("Error during delete request:", error); // Log detailed error
      setErrorMessage(error.message);
    }
  }

  const handleDelete = async (studentNumber) => {
    console.log(studentNumber)
    try {
      const response = await fetch("/deleteAttendance", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ studentNumber })
      });
  
      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse); // Parse error message from response
      }
    } catch (error) {
      console.error("Error during delete request:", error); // Log detailed error
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 🔴 Edit Pop-up */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Player</DialogTitle>
            <DialogDescription>
              Switch a player to another event.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newEventID" className="text-right">
                Event ID
              </Label>
              <Input id="newEventID" placeholder="1" className="col-span-3" onChange={handleChange} />
              <Label htmlFor="newStudentNumber" className="text-right">
                Student Number
              </Label>
              <Input id="newStudentNumber" placeholder="2022153255" className="col-span-3" onChange={handleChange} />
              <Label htmlFor="newHouseName" className="text-right">
                Hosue Name
              </Label>
              <Input id="newHouseName" placeholder="Cybernetics" className="col-span-3" onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => handleEdit(studentNumber)}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🔴 Delete Pop-up */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Do you want to delete the entry? Deleting this entry cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => handleDelete(studentNumber)} className="hover:bg-destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AttendanceActionsForm;
