"use client";

import React from "react";
import dayjs from "dayjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { cn } from "@/lib/utils";
import { useLogStore } from "@/store";

export function Calendar() {
  const logs = useLogStore((state) => state.logs);

  function getDayInMonth(year = dayjs().year(), month = dayjs().month()) {
    const startDate = dayjs().year(year).month(month).date(1);
    const endDate = startDate.endOf("month");

    let dateArray = [];

    for (let i = startDate.date(); i <= endDate.date(); i++) {
      dateArray.push(startDate.date(i).format("YYYY-MM-DD"));
    }

    return dateArray;
  }

  const getColor = (value: number) => {
    if (value === 0) {
      return "bg-gray-100";
    } else if (value < 5) {
      return "bg-green-100";
    } else if (value < 10) {
      return "bg-green-300";
    } else {
      return "bg-green-500";
    }
  };

  const hour = 0;

  console.log(logs);

  return (
    <div className="border border-dashed flex flex-wrap gap-2 p-10 justify-center rounded-md">
      {getDayInMonth().map((value, index) => (
        <HoverCard key={index}>
          <HoverCardTrigger>
            <div
              className={cn(
                "h-5 w-5 bg-gray-100 rounded-md cursor-pointer",
                getColor(hour || 0)
              )}
            ></div>
          </HoverCardTrigger>
          <HoverCardContent>0 hours on {value}</HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
