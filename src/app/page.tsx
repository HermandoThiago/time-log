import { Newlog, Navbar, Calendar, Logs } from "@/components";
import React from "react";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InitialLog from "@/components/state/InitLog";
import { Log } from "@/store";

export const dynamic = "force-dynamic";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/auth");
  }

  const { data: logs } = await supabase
    .from("logs")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="p-5 space-y-10">
      <InitialLog logs={logs as Log[]} />
      <Navbar />
      <Newlog />
      <Calendar />
      <Logs />
    </div>
  );
}
