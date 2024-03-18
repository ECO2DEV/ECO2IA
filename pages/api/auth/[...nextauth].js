import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { header, strapiUrl } from '../../../constants/constans';

import axios from 'axios';
import {
  createUserForProvider,
  getUserByEmail,
  setFreemiumPlan
} from '../../../util/api/user';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, account) {
        try {
          const { data } = await axios.post(`${strapiUrl}/api/auth/local`, {
            identifier: credentials.email,
            password: credentials.password,
            provider: account.provider
          });
          if (data) {
            // console.log('nextauth data inside credentials in authorize', data);
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
          // Redirecting to the login page with error message in the URL
          console.log(e);
          throw new Error('Invalid credentials ' + e);
          //return null;
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
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
    async redirect({ url, baseUrl = 'http://localhost:3000' }) {
      // console.log(baseUrl + "/dashboard");
      return baseUrl + '/dashboard';
    },
    async jwt({ token, account, user }) {
      // const isSignIn = user ? true : false;

      if (account) {
        switch (account?.type) {
          case 'credentials':
            token.id = user.id;
            token.jwt = user.jwt;

            break;
          case 'oauth':
            token.accessToken = account.access_token;
            const { id, username, email, Name } = await getUserByEmail({
              email: user.email
            });

            // console.log(
            //   'all data after get user by email',
            //   id,
            //   username,
            //   email,
            //   Name
            // );
            if (id == null) {
              // Create a new user in Strapi backend
              // console.log('viendo el token en el create user', token);
              const resPlan = await setFreemiumPlan();
              const dataStripe = { email: user.email, name: user.name };
              const resStripe = await axios.post(
                `${strapiUrl}/api/payment/createUser`,
                dataStripe,
                header
              );

              const newUserResponse = await createUserForProvider({
                username: user.name,
                email: user.email,
                password: 'encrypter',
                customer_id: resStripe.data.id,
                plan: {
                  id: resPlan.data.data.id
                }
              });

              // console.log('newUserResponse', newUserResponse.data.user);

              token.user = {
                id: newUserResponse.data.user.id,
                username: newUserResponse.data.user.username,
                email: newUserResponse.data.user.email,
                Name: newUserResponse.data.user.username
              };
            } else {
              // const { id, username, email, Name } = await getUserByEmail({
              //   email: user.email
              // });

              token.user = {
                id: id,
                username: username,
                email: email,
                Name: Name
              };
            }

            // console.log('find it the token inside callback', token);
            break;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.accessToken) {
        session.id = token.id;
        session = token.user;
        session.picture = token.picture;
        session.accessToken = token.accessToken;

        return session;
      } else {
        session.user = token.user;
        session.id = token.id;
        // console.log('Este es el clg final session' + JSON.stringify(session));
        return session;
      }
    }
  }
};

export default NextAuth(authOptions);
