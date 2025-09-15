import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const NextOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials ", credentials);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        console.log("data ", data);

        if (data.message === "success") {
          const decoded: { id: string } = jwtDecode(data.token);

          console.log("decodeToken", decoded);

          return {
             user : data.user,
             token: data.token,
             id:decoded.id
          };
        } else {
          throw new Error(data.message);
        }
      }
    })
  ],
  callbacks:{
   async jwt({ token, user }) {
    if (user) {
        token.user = user.user;
        token.token = user.token;
    }
  return token;
},
   async session({ session, token }) {
    session.user = token.user;
    session.token = token.token;
    return session;
}

  }
};

const handler = NextAuth(NextOptions);
export { handler as GET, handler as POST };
