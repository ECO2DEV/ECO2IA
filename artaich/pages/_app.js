import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
  <Layout>

      <Component {...pageProps} />

    </Layout>
  );
}

export default MyApp