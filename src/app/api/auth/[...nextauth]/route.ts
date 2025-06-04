import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
 
// Function to convert an object to URL-encoded form data
function toFormData(obj) {
  const formBody = [];
  for (const property in obj) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(obj[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join("&");
}

export const authOptions : NextAuthOptions = {
  
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        //user: { label: "Username", type: "text", placeholder: "jsmith", value: "administrator" },
        email: { label: "Email", type: "text", placeholder: "admin@admin.com.br", value: "admin@admin.com.br" },
        password: { label: "Password", type: "password", value: "1234" },
      },
      async authorize(credentials, req) {
        // Include hidden values here
        const data = {
          email: credentials.email,
          password: credentials.password,
        };

        if (!credentials) throw new Error("Missing credentials");

     
       const formData = toFormData(data);
        console.log(formData);
        try {
          const res = await fetch("http://localhost:4001/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
       
          const resData = await res.json();
          console.log(res)
          
          /*if (res.ok && resData) {
            return resData.data;
          } else {
            console.error('Authorization failed:', resData.data);
            return null;
          }*/
            return { id: "1", name: "credentials.user", accessToken: resData.token, }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin'
  },
  session: { strategy: "jwt" },
  callbacks: {

    /*async jwt({token, user}){
      return {...token, ...user}
    },
    async session ({ session, token, user }) {
      session.user = token as any ;
      return session;
    }*/

      async jwt({ token, user }) {
        // First time login
        if (user) {
          token.id = user.id;
          token.accessToken = (user as any).accessToken;
        }
        return token;
      },
      async session({ session, token }) {
        if (token && session.user) {
          (session as any).accessToken = token.accessToken;
        }
        return session;
      },
  
  }
  
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };