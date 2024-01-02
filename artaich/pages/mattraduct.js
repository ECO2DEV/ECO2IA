import Modal from '../components/modal/modal';
import MattraductAI from '../components/mattraduct/mattraduct';
import { getUser } from '../util/api/user';

const Mattraduct = (props) => {
  return (
    <div>
      {!props.user.plan ? (
        <Modal user={props?.user} />
      ) : +props?.user?.plan?.max_tokens <= 0 ? (
        <Modal user={props?.user} />
      ) : (
        <MattraductAI />
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

export default Mattraduct;
