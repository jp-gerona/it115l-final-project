import React from "react";

import { Button } from "@/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/client/components/ui/dialog";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

// todo: not sure if all fields should be required to fill out
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

const AddPlayerForm = () => {
  const [playerData, setPlayerData] = useState({ eventID: "", studentNumber: "", houseName: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  const addPlayer = async () => {
    // event.preventDefault();
    const { EVENTID, STUDENTNUMBER, HOUSENAME } = playerData;

    try {
      const response = await fetch("/addPlayer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ EVENTID, STUDENTNUMBER, HOUSENAME })
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
            Add Player
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Player</DialogTitle>
          <DialogDescription>
            Make sure they are part of the members list.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.id} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.id}
                placeHolder={field.placeHolder}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick = {addPlayer} type="submit">Add Player</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayerForm;
