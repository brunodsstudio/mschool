
"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

  export default async function UserInfo(){
    
    const session = await getServerSession(authOptions);
    const res = await fetch("http://localhost:3001/clientes", {
      headers: {
      Authorization: `Bearer ${(session as any)?.accessToken}`,
      },
    });
    const data = await res.json();
    console.log(data);
  
  return data;
}
