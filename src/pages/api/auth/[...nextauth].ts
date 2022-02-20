import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: `credentials`,
      credentials: {},

      async authorize(credentials: any) {
        const response = await axios.post(
          `http://localhost:3333/api/v1/login`,
          credentials,
        );

        if (response.data.httpCode === 200) {
          return { ...response.data.data.user, jwt: response.data.data.jwt };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async (user: any) => {
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt;
      return session;
    },
  },
});
