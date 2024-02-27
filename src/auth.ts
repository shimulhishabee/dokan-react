import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { authConfig } from './auth.config';
// import { cookies } from 'next/headers';
import { api } from '@/lib/api';
import { login } from '@/lib/actions';



export const { auth, signIn, signOut, handlers: {GET, POST} } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
        name: 'Credentials',
      credentials: {
        mobile_number: {
          label: 'Mobile Number',
          type: 'text',
          placeholder: 'Mobile',
        },
        pin: {
          label: 'Pin',
          type: 'password',
        },
      },
      async authorize(credentials) {
        console.log("credentials------------", credentials)
        // const cookieStore = cookies();
        const response = await login({mobile_number: credentials?.mobile_number, pin: credentials?.pin})
        const user = await response?.data;
        console.log("user------------", response)
        if (response?.status === 200 && user.user.id) {
        //   cookieStore.set('access_token', user.access_token);
        //   cookieStore.set('auth-error-message', '');
          return user.user;
        } else {
          return { errorMessage: user.message };
        }
      },
    }),
  ],
  
});