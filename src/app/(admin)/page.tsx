import type { Metadata } from "next";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import UserInfo from "@/components/school/UserInfo";


export const metadata: Metadata = {
  title:
    "Next.js School Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function School() {

  const session = await getServerSession(authOptions);
  const dataInfo = UserInfo();

  if (!session) {
    redirect("/signin");
  }
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

    </div>
  );
}


