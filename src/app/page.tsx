import { Newlog } from "@/components";
import Navbar from "@/components/Navbar";
import React from "react";

export default function page() {
  return (
    <div className="p-5 space-y-10">
      <Navbar />
      <Newlog />
    </div>
  );
}
