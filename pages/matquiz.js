import Head from 'next/head';
import { MatquizAI } from '../components/matquiz/MatquizAI';
import Modal from '../components/modal/modal';

import { getUser } from '../util/api/user';

const Matquiz = (props) => {
  return (
    <div>
      <Head>
        <title>MATTQUIZ</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/Mlogo.ico" />
      </Head>
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <MatquizAI />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const result = await getUser(context);

  if (!result?.data) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  return {
    props: {
      user: result?.data,
      session: result?.session
    }
  };
};

export default Matquiz;