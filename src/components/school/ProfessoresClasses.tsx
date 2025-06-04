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
import Checkbox from '../form/input/Checkbox';
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
    { data: 'Professor' },
    { data: 'Materia' },
    { data: 'Grau' },
    { data: 'cA' },
    { data: 'cB' },
    { data: 'cC' },
    { data: 'cD' },
    { data: 'cE' },
    { data: 'cF' },
    
];

export default function ProfessoresClasses({
    estuds,
  }: {
    estuds: Promise<{ id: string; professor: string; 
      materia:string; classId:string; grauId:string, 
      grau:string, cA:boolean, cB:boolean, cC:boolean, cD:boolean, cE:boolean, cF:boolean}[]>
  }) {

  const ProfessoresClasses = use(estuds)

  return (

  <div> 
    <DataTable columns={columns} className="display">
      <thead>
        <tr>
          <th>Id</th>
          <th>Professor</th>
          <th>Materia</th>
          <th>Grau</th>
          <th>Classe A</th>
          <th>Classe B</th>
          <th>Classe C</th>
          <th>Classe D</th>
          <th>Classe E</th>
          <th>Classe F</th>
         
        </tr>
      </thead>
      <tbody>
      {ProfessoresClasses.map((est, index) =>{
        return (
            <tr key={index}>
                <td>{est.id}</td>
                <td><Link href={'/aluno/'+est.id}>{est.professor}</Link></td>
                <td>{est.materia}</td>
                <td>{est.grau}</td>
                
                <td><Checkbox
                  checked={est.cA}
                  onChange={() => {}}
                  />
                </td>
                 <td><Checkbox
                  checked={est.cB}
                  onChange={() => {}}
                  />
                </td>
                 <td><Checkbox
                  checked={est.cC}
                  onChange={() => {}}
                  />
                </td>
                 <td><Checkbox
                  checked={est.cD}
                  onChange={() => {}}
                  />
                </td>
                 <td><Checkbox
                  checked={est.cE}
                  onChange={() => {}}
                  />
                </td>
                 <td><Checkbox
                  checked={est.cF}
                  onChange={() => {}}
                  />
                </td>
              
            </tr>
            )}
        )
    }
      </tbody>
    </DataTable>
    </div>
  )
}