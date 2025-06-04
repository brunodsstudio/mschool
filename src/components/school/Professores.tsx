'use client';

import { useState, useEffect, use} from 'react';
import UserInfo from "@/fetchInfo/AlunosInfo";
//import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import Link from 'next/link';
import { ChevronDownIcon, PencilIcon, TrashBinIcon } from '@/icons';

import dynamic from 'next/dynamic';
//import 'datatables.net-dt/css/jquery.dataTables.css';

const DataTable = dynamic(
          async () => {
            const dtReact = await import('datatables.net-react');
            const dtNet = await import('datatables.net-dt');
            const [reactMod, dtNetMod] = await Promise.all([dtReact, dtNet]);
            dtReact.default.use(dtNet.default);
            return dtReact.default;
          },
          { ssr: false }
        );

//DataTable.use(DT);

const columns = [
    { data: 'id' },
    { data: 'nome' },
    { data: 'materia' },
  

];

export default function Professores({
    estuds,
  }: {
    estuds: Promise<{ id: string; nome: string; materia:string; }[]>
  }) {

  const Professores = use(estuds)

  return (

  <div> 
    <DataTable columns={columns} className="display">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Materia</th>
         
         
        </tr>
      </thead>
      <tbody>
      {Professores.map((est, index) =>{
        return (
            <tr key={index}>
                <td>{est.id}</td>
                <td><Link href={'/professores/'+est.id}>{est.nome}</Link></td>
                <td>{est.materia}</td>  
            </tr>
            )}
        )
    }
      </tbody>
    </DataTable>
    </div>
  )
}