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
        user: { label: "Username", type: "text", placeholder: "jsmith", value: "administrator" },
        password: { label: "Password", type: "password", value: "admin" },
      },
      async authorize(credentials, req) {
        // Include hidden values here
        const data = {
          user: credentials.user,
          password: credentials.password,
        };

        if (!credentials) throw new Error("Missing credentials");

     
        const formData = toFormData(data);
        try {
          const res = await fetch("http://localhost:3001/login", {
            method: 'POST',
            body: formData,
            headers: { 
              "Content-Type": "application/x-www-form-urlencoded",
            }
          });
       
          const resData = await res.json();
          console.log(resData)
          
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