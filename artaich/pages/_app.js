import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //const getLayout = Component.getLayout ?? defaultPageLayout
  const router = useRouter();
  
  if(router.pathname =='/auth/signin')  {
     return (
      <SessionProvider session={session}>
       <Component {...pageProps} />
       </SessionProvider>
     )
  }

  return (
   
  <SessionProvider session={session}>
  
  <Layout>
      <Component {...pageProps} />
  </Layout>
  </SessionProvider>
  );
}

export default MyApp