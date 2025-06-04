import ChartBarEstudantes  from "@/components/school/ChatBarEstudantes";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import {countGrau} from "@/fetchInfo/AlunosInfo";

export const metadata: Metadata = {
  title: "Next.js Bar Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Bar Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

type CGRAU = {
   id: number;
   nome: string;
   sigla: string;
   count: number;
}
const cG:Promise<CGRAU[]> = countGrau();
console.log(cG)

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <ChartBarEstudantes chartdata={cG}></ChartBarEstudantes>
        </ComponentCard>
      </div>
    </div>
  );
}
