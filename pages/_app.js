import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import LayoutUser from '../components/layout/layout_user';
import { PromptProvider } from '../context/prompts/PromptProvider';
import { SWRConfig } from 'swr';
import { UserProvider } from '../context/user/UserProvider';
import { Providers } from '../util/providers/providers';
import { StoreProvider } from '../context/store/StoreProvider';
import { ExerciseProvider } from '../context/exercise/ExerciseProvider';
// import { Elements } from '@stripe/react-stripe-js';
// import { stripePromise } from '../constants/constans';
// console.log(stripePromise);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //const getLayout = Component.getLayout ?? defaultPageLayout
  const router = useRouter();
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
  //   mode: 'payment',
  //   // amount: 1099,
  //   currency: 'eur'
  // };

  if (router.pathname == '/auth/signin') {
    return (
      <SessionProvider session={session}>
        <UserProvider>
          <StoreProvider>
            <ExerciseProvider>
              <Component {...pageProps} />
            </ExerciseProvider>
          </StoreProvider>
        </UserProvider>
      </SessionProvider>
    );
  }

  if (router.pathname == '/suscribe') {
    return (
      <SessionProvider session={session}>
        <UserProvider>
          <StoreProvider>
            <ExerciseProvider>
              <Component {...pageProps} />
            </ExerciseProvider>
          </StoreProvider>
        </UserProvider>
      </SessionProvider>
    );
  }

  if (
    router.pathname == '/pairoll' ||
    router.pathname == '/dashboard' ||
    router.pathname == '/eco2chat' ||
    router.pathname == '/eco2image' ||
    router.pathname == '/profile' ||
    router.pathname == '/eco2traduct' ||
    router.pathname == '/eco2sport' ||
    router.pathname == '/eco2quiz' ||
    router.pathname == '/eco2description' ||
    router.pathname == '/eco2resum' ||
    router.pathname == '/eco2cv' ||
    router.pathname == '/renovhome' ||
    router.pathname == '/chatia' ||
    router.pathname == '/eco2diagnose'
  ) {
    return (
      <Providers>
        <SessionProvider session={session}>
          <UserProvider>
            <StoreProvider>
              <PromptProvider>
                <ExerciseProvider>
                  <SWRConfig value={{}}>
                    {/* <Elements stripe={stripePromise} options={options}> */}
                    <LayoutUser {...pageProps}>
                      <Component {...pageProps} />
                    </LayoutUser>
                    {/* </Elements> */}
                  </SWRConfig>
                </ExerciseProvider>
              </PromptProvider>
            </StoreProvider>
          </UserProvider>
        </SessionProvider>
      </Providers>
    );
  }
  return (
    <Providers>
      <SessionProvider session={session}>
        <UserProvider>
          <StoreProvider>
            {/* <Elements stripe={stripePromise} options={options}> */}
            <ExerciseProvider>
              <Layout router={router.pathname}>
                <Component {...pageProps} />
              </Layout>
            </ExerciseProvider>
            {/* </Elements> */}
          </StoreProvider>
        </UserProvider>
      </SessionProvider>
    </Providers>
  );
}

export default MyApp;
