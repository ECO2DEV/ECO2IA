import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import { useRouter } from 'next/router';
import LayoutUser from '../components/layout/layout_user';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PromptProvider } from '../context/prompts/PromptProvider';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(
  'pk_test_51MmF5HEZbX6Zpxv9PbTYYGR1U9d14TmcHEsxCKTPzDVpKXDcaFqz87ElscE2TRYjdV3t1r5gxVo3G8FRAlOivqKG00jMOoioNN'
);
console.log(stripePromise);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //const getLayout = Component.getLayout ?? defaultPageLayout
  const router = useRouter();
  const options = {
    // passing the client secret obtained from the server
    clientSecret: process.env.STRIPE_SECRET,
    mode: 'subscription',
    amount: 1099,
    currency: 'eur'
  };

  if (router.pathname == '/auth/signin') {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  if (
    router.pathname == '/dashboard' ||
    router.pathname == '/chatgpt' ||
    router.pathname == '/dalle' ||
    router.pathname == '/profile'
  ) {
    return (
      <SessionProvider session={session}>
        <PromptProvider>
          <LayoutUser {...pageProps}>
            <Component {...pageProps} />
          </LayoutUser>
        </PromptProvider>
      </SessionProvider>
    );
  }
  return (
    <SessionProvider session={session}>
      <Elements stripe={stripePromise} options={options}>
        <Layout router={router.pathname}>
          <Component {...pageProps} />
        </Layout>
      </Elements>
    </SessionProvider>
  );
}

export default MyApp;
