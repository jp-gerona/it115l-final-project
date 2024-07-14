import React, { useState } from "react";

import { Button } from "@/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/client/components/ui/dialog";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { PlusCircle } from "lucide-react";

const fields = [
  {
    id: "EVENTID",
    label: "Event ID",
    placeHolder: "1",
  },
  {
    id: "STUDENTNUMBER",
    label: "Student No.",
    placeHolder: "2018123456",
  },
  {
    id: "HOUSENAME",
    label: "House Name",
    placeHolder: "Cybernetics",
  },
];

const AddAttendanceForm = () => {
  const [playerData, setPlayerData] = useState({
    EVENTID: "",
    STUDENTNUMBER: "",
    HOUSENAME: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const newErrors = {};
    if (!data.EVENTID || isNaN(data.EVENTID))
      newErrors.EVENTID = "Event ID must be a number.";
    if (!data.STUDENTNUMBER || !/^\d{10}$/.test(data.STUDENTNUMBER))
      newErrors.STUDENTNUMBER = "Student No. must be 10 digits.";
    if (!data.HOUSENAME) newErrors.HOUSENAME = "House Name is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPlayerData({ ...playerData, [id]: value });
  };

  const addPlayer = async () => {
    const formErrors = validate(playerData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;
    console.log(playerData);

    try {
      const response = await fetch("/addPlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(errorResponse); // Parse error message from response
      }
    } catch (error) {
      console.error("Error during add request:", error); // Log detailed error
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Attendance
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Attendance</DialogTitle>
          <DialogDescription>
            Add a record of attendance for a student at a specific event.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.id} className="text-right">
                {field.label}
              </Label>
              <div className="col-span-3">
                <Input
                  id={field.id}
                  placeholder={field.placeHolder}
                  onChange={handleChange}
                />
                {errors[field.id] && (
                  <p className="text-destructive text-xs col-span-4">
                    {errors[field.id]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={addPlayer} type="submit">
            Add Player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttendanceForm;
