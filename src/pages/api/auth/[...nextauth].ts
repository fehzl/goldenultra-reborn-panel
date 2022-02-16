import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: `credentials`,
      credentials: {},

      async authorize() {
        const user = { id: `123`, name: `John Doe` };
        if (user) return user;
        return null;
      },
    }),
  ],
});
