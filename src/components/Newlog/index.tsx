"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { GrAdd } from "react-icons/gr";
import { DatePickerDemo } from "..";
import { useLogStore } from "@/store";

import { useToast } from "../ui/use-toast";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Newlog() {
  const { toast } = useToast();

  const log = useLogStore((state) => state.log);

  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);

  const supabase = createClientComponentClient();

  const closeDialog = () => {
    document.getElementById("close-btn")?.click();
  };

  const validateLog = () => {
    if (!log.date || !log.note || log.hour === 0) {
      throw "Date or hour can not be empty";
    } else if (log.hour > 24) {
      throw "Please enter a valid hour";
    }
  };

  const submitLog = async () => {
    try {
      validateLog();

      const { error } = await supabase
        .from("logs")
        .upsert({ ...log, date: dayjs(log.date).format("YYYY-MM-DD") })
        .select("*")
        .single();

      const date = log.date as Date;

      if (!error) {
        setLogs(log, dayjs(log.date).format("YYYY-MM-DD"));

        toast({
          title: "log created successfully",
          description: `${log.hour} hours in ${date.toDateString()}`,
        });

        closeDialog();
      } else {
        toast({
          variant: "destructive",
          title: "Fail to create log",
          description: error.message,
        });
      }
    } catch (e) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full sm:w-72 border-dashed border py-3 flex items-center justify-center rounded-md cursor-pointer hover:border-solid">
          <GrAdd />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Log</DialogTitle>
          <DialogDescription>
            {
              "Remenber, time is your most valuable asset - invest it wisely with our Time Log App!!"
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <DatePickerDemo />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hour" className="text-right">
              Hour
            </Label>
            <Input
              id="hour"
              type="number"
              className="col-span-3"
              value={log.hour}
              onChange={(e) =>
                setLog({ ...log, hour: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Note
            </Label>
            <Input
              id="username"
              placeholder="Note of the log"
              className="col-span-3"
              value={log.note}
              onChange={(e) => setLog({ ...log, note: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitLog}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
