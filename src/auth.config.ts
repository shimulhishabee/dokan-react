import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  providers: [
    // added later in auth.ts 
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("----isLoggedIn----", isLoggedIn)
      const isOnDashboard = nextUrl.pathname.startsWith('/contact');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/contact', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = user as any;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user as any;
      return session;
    },
  },
} satisfies NextAuthConfig;