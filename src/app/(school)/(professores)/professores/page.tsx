import type { Metadata } from "next";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Estudantes from "@/components/school/Estudantes";
import {professores} from "@/fetchInfo/AlunosInfo";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Professores from "@/components/school/Professores";

//import '@css/datatables.net-dt/css/jquery.dataTables.css';




export const metadata: Metadata = {
  title:
    "Next.js School Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function School() {

  const session = await getServerSession(authOptions);
  const dataInfo = professores();

  if (!session) {
   // redirect("/signin");
  }
  return (
    <div>
    <PageBreadcrumb pageTitle="Professores" />
      <div className="space-y-4">
        <ComponentCard title="Todos os Professores">
          <Professores estuds={dataInfo}></Professores>
      </ComponentCard>
      </div>
      

    </div>
  );
}


