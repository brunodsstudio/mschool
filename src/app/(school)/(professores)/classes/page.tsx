import type { Metadata } from "next";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Estudantes from "@/components/school/Estudantes";
import {professoresMateriasClasses} from "@/fetchInfo/AlunosInfo";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import ProfessoresClasses from "@/components/school/ProfessoresClasses";

//import '@css/datatables.net-dt/css/jquery.dataTables.css';




export const metadata: Metadata = {
  title:
    "Next.js School Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Classes() {

  const session = await getServerSession(authOptions);
  const dataInfo = professoresMateriasClasses();

  if (!session) {
   // redirect("/signin");
  }
  return (
    <div>
    <PageBreadcrumb pageTitle="Classes/Professores" />
      <div className="space-y-4">
        <ComponentCard title="Todos os Alunos">
          <ProfessoresClasses estuds={dataInfo}></ProfessoresClasses>
      </ComponentCard>
      </div>
      

    </div>
  );
}


