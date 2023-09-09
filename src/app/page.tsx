import { Newlog, Navbar, Calendar } from "@/components";
import React from "react";

export default function page() {
  return (
    <div className="p-5 space-y-10">
      <Navbar />
      <Newlog />
      <Calendar />
    </div>
  );
}
