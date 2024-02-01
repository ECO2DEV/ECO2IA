import Head from 'next/head';
import TextSummarizerPage from '../components/matresum/TextSummarizer';
import Modal from '../components/modal/modal';
import { getUser } from '../util/api/user';

export default function MatResume(props) {
  return (
    <div className="my-10">
      <Head>
        <title>MATTRESUME</title>
        <meta name="description" content="Generated by ECO² Colombia" />
        <link rel="icon" href="/Mlogo.ico" />
      </Head>
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <TextSummarizerPage user={props.user.id} />
      )}
    </div>
  );
}

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