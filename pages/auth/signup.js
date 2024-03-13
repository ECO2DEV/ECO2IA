import { getSession } from 'next-auth/react';
import Register from '../../components/register/register';

function signup() {
  return <Register />;
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

export default signup;
