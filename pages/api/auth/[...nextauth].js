import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import axios from 'axios';
const strapiUrl = process.env.STRAPI_URL;


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${strapiUrl}/api/auth/local`, {
            identifier: credentials.email,
            password: credentials.password
          });
          if (data) {
            console.log('nextauth data ', data);
            const token = {
              id: data.user.id,
              name: data.user.username,
              email: data.user.email,
              jwt: data.jwt
            };

            return { ...data, ...token };
          } else {
            return null;
          }
        } catch (e) {
          // console.log('caught error');
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          console.log(e);
          throw new Error('Invalid credentials ' + e);
          //return null;
        }
      }
    })
  ],
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    //maxAge: 3600,
    maxAge: 28800 // 8h
  },
  session: {
    jwt: true,
    maxAge: 28800 // 8h
    //
    // 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request' // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      //console.log("Estoy aqui" + JSON.stringify(session));
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      // Refactor
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      // console.log("Pasando por aqui" + JSON.stringify(token));
      return Promise.resolve(token);
    }
  }
};

export default NextAuth(authOptions);