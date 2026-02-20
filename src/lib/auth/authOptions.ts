import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Kullanıcı adı' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Demo users - replace with real auth logic
        const demoUsers = [
          { id: '1', name: 'Demo User', email: 'demo@nabizkibris.com', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo' },
          { id: '2', name: 'Hasan', email: 'hasan@nabizkibris.com', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hasan' },
        ];

        if (credentials?.username && credentials?.password) {
          // Simple validation - replace with real auth
          const user = demoUsers.find(u => u.name.toLowerCase().includes(credentials.username.toLowerCase()));
          if (user) {
            return user;
          }
        }
        
        // Return demo user for testing
        return demoUsers[0];
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'nabizkibris-secret-key-change-in-production',
};
