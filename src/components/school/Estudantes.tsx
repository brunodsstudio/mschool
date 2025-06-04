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
import Button from '../ui/button/Button';


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
    { data: 'ra' },
    { data: 'classId' },
    { data: 'grauId' },
    { data: 'edit' },

];




export default function Estudantes({
    estuds,
  }: {
    estuds: Promise<{ id: string; nome: string; ra:string; classId:string; grauId:string, classe:string, grau:string}[]>
  }) {

  const allEstudantes = use(estuds)

   async function removeProduct(id: number) {
     
    }


  return (

  <div> 
    <DataTable columns={columns} className="display">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Ra</th>
          <th>Classe</th>
          <th>Grau</th>
          <th>Edit</th>
         
         
        </tr>
      </thead>
      <tbody>
      {allEstudantes.map((est, index) =>{
        return (
            <tr key={index}>
                <td>{est.id}</td>
                <td><Link href={'/aluno/'+est.id}>{est.nome}</Link></td>
                <td>{est.ra}</td>
                <td>{est.classe}</td>
                <td>{est.grau}</td>
                <td><Link href={'/aluno/'+est.id}>
                    <Button size="md" variant="primary" startIcon={<PencilIcon />} children={undefined} ></Button>
                </Link></td>
                
            </tr>
            )}
        )
    }
      </tbody>
    </DataTable>
    </div>
  )
}