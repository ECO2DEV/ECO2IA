import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/layout';
import {useRouter} from 'next/router';
import LayoutUser from '../components/layout/layout_user';

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
    
  if(router.pathname =='/dashboard' || router.pathname =='/chatgpt' || router.pathname =='/dalle')  {
    return (
     <SessionProvider session={session}>
     <LayoutUser>
      
      <Component {...pageProps} />
      </LayoutUser>
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