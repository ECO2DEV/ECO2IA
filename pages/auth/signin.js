import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { LoginForm } from '../../components/login/LoginForm';

export default function SignIn() {
  return (
    <>
      <Head>
        <title>ECO2IA</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/eco2it_logo.jpeg" />
      </Head>
      <LoginForm />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/dashboard'
      }
    };
  }

  return {
    props: {}
  };
}

SignIn.getLayout = (page) => page;
