import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import LayoutUser from '../components/layout/layout_user';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PromptProvider } from '../context/prompts/PromptProvider';
import { SWRConfig } from 'swr';
import { UserProvider } from '../context/user/UserProvider';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

// const stripePromise = loadStripe(
//   'pk_test_51MmF5HEZbX6Zpxv9PbTYYGR1U9d14TmcHEsxCKTPzDVpKXDcaFqz87ElscE2TRYjdV3t1r5gxVo3G8FRAlOivqKG00jMOoioNN'
// );
// console.log(stripePromise);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //const getLayout = Component.getLayout ?? defaultPageLayout
  const router = useRouter();
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: process.env.STRIPE_SECRET,
  //   mode: 'payment',
  //  // amount: 1099,
  //   currency: 'eur'
  // };

  if (router.pathname == '/auth/signin') {
    return (
      <SessionProvider session={session}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionProvider>
    );
  }

  if (router.pathname == '/suscribe') {
    return (
      <SessionProvider session={session}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionProvider>
    );
  }

  if (
    router.pathname == '/pairoll' ||
    router.pathname == '/dashboard' ||
    router.pathname == '/mattchat' ||
    router.pathname == '/mattimage' ||
    router.pathname == '/profile' ||
    router.pathname == '/mattraduct' ||
    router.pathname == '/mattsport' ||
    router.pathname == '/matquiz' ||
    router.pathname == '/matdescription' ||
    router.pathname == '/mattresum' ||
    router.pathname == '/matcv'
  ) {
    return (
      <SessionProvider session={session}>
        <UserProvider>
          <PromptProvider>
            <SWRConfig value={{}}>
              {/* <Elements stripe={stripePromise} options={options}> */}
              <LayoutUser {...pageProps}>
                <Component {...pageProps} />
              </LayoutUser>
              {/* </Elements> */}
            </SWRConfig>
          </PromptProvider>
        </UserProvider>
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <UserProvider>
        {/* <Elements stripe={stripePromise} options={options}> */}
        <Layout router={router.pathname}>
          <Component {...pageProps} />
        </Layout>
        {/* </Elements> */}
      </UserProvider>
    </SessionProvider>
  );
}

export default MyApp;
