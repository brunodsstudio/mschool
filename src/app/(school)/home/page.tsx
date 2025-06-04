import type { Metadata } from "next";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Estudantes from "@/components/school/Estudantes";
import UserInfo from "@/fetchInfo/AlunosInfo";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import { MoreDotIcon, UserCircleIcon } from "@/icons";
import { link } from "fs";
import Link from "next/link";


//import '@css/datatables.net-dt/css/jquery.dataTables.css';




export const metadata: Metadata = {
  title:
    "Next.js School Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};



export default async function School() {

  const session = await getServerSession(authOptions);
  const dataInfo = UserInfo();
  

  if (!session) {
   // redirect("/signin");
  }
  return (
    <div>
    <PageBreadcrumb pageTitle="Alunos" />
      <div className="space-y-4">
        <Link href={'/aluno'}>
            <Button size="md" variant="primary" startIcon={<UserCircleIcon />}  >
              Novo Aluno
            </Button>
        </Link>
        <br/><br/>
       <ComponentCard title="Todos os Alunos">
          <Estudantes estuds={dataInfo}></Estudantes>
      </ComponentCard>
      </div>

    </div>
  );
}


