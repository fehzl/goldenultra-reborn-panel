import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: `credentials`,
      credentials: {},

      async authorize(credentials: any) {
        console.log(credentials);
        const user = { id: `123`, name: `John Doe` };
        if (credentials?.email === `Felipe`) return user;
        return null;
      },
    }),
  ],
});
