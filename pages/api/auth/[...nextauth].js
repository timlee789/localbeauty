import NextAuth from 'next-auth/next';
import User from '../../../models/Users';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import db from '../../../utils/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
       if (user?.name) token.name = user.name;
       if (user?.city) token.city = user.city;
       if (user?.url) token.url = user.url;
       if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.name) session.user.name = token.name;
      if (token?.city) session.user.city = token.city;
      if (token?.url) session.user.url = token.url;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
       
        await db.disconnect();
        if (user && bcrypt.compare(credentials.password, user.password)) {
          return {
             _id: user._id,
             name: user.name,
             email: user.email,
             image: user.img1,
             city: user.city,
             url: user.url,
             isAdmin: user.isAdmin,
          };
        }
        throw new Error('Invalid email or password');
      },
    }),
  ],
});
