import { Newlog, Navbar, Calendar, Logs } from "@/components";
import React from "react";

export default function page() {
  return (
    <div className="p-5 space-y-10">
      <Navbar />
      <Newlog />
      <Calendar />
      <Logs />
    </div>
  );
}
