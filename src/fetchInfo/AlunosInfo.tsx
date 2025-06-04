
"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { routeModule } from "next/dist/build/templates/pages";


type aluno = {
    id?:string;
    nome:string;
    ra:string;
    classId:string;
    grauId:string;
  }

export default async function UserInfo(){
    
    const session = await getServerSession(authOptions);
    //console.log(`Bearer ${(session as any)?.accessToken}`);
    const res = await fetch("http://localhost:4001/estudantes", {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();

  return data;
}

export async function countGrau(){
  const session = await getServerSession(authOptions);
    //console.log(`Bearer ${(session as any)?.accessToken}`);
    const res = await fetch("http://localhost:4001/estudantes/countGrau", {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();

  
  return data;
}

export async function graus(){
  const session = await getServerSession(authOptions);

    const res = await fetch("http://localhost:4001/graus", {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();

  
  return data;
}

export async function classes(){
  const session = await getServerSession(authOptions);

    const res = await fetch("http://localhost:4001/classes", {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();

  
  return data;
}

export async function aluno(id:string){
  const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/estudantes/${id}`, {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();  
  return data;
}

export async function professoresMateriasClasses(){
  const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/professoresMateriasClasses`, {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();  
  return data;
}

export async function professores(){
  const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/professores`, {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();  
  return data;
}

export async function createAluno(aluno:aluno){
  const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/estudantes`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          nome: aluno.nome,
          ra:aluno.ra,
          classId:aluno.classId,
          grauId: aluno.grauId
        }),
    });
    console.log(res)

    const data = await res.json();  
  if(data)
      return true;
}


export async function deleteAluno(id:string){
  const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/estudantes/${id}`, {
      method: 'delete',
      headers: {
      'Content-Type': 'application/json',
      },
    });
    console.log(res)
    
      return true;
}

export async function updateAluno(aluno:aluno){
  //const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/estudantes/`, {
      method:'put',
      headers: {
      'Content-Type': 'application/json',
      ///Authorization: `${(session as any)?.accessToken}`,
      },
      body: JSON.stringify({
          id: aluno.id,
          nome: aluno.nome,
          ra:aluno.ra,
          classId:aluno.classId,
          grauId: aluno.grauId
        }),
    });

    const data = await res.json();  
     if(data)
      return true;
}

export async function lote300(){
  const session = await getServerSession(authOptions);

    const res = await fetch(`http://localhost:4001/lotes/300`, {
      headers: {
      Authorization: `${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();  
  return data;
}
