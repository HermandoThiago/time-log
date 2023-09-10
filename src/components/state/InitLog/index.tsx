"use client";
import { Log, useLogStore } from "@/store";
import React, { useRef } from "react";

export default function InitialLog({ logs }: { logs: Log[] }) {
  const initRef = useRef<boolean>();

  const prepareLog = () => {
    const result: {
      [key: string]: Log;
    } = {};

    logs.forEach((log) => {
      result[log.date as string] = { ...log, date: new Date(log.date) };
    });

    return result;
  };

  if (!initRef.current) {
    useLogStore.setState({
      logs: prepareLog(),
    });

    initRef.current = true;
  }

  return null;
}
