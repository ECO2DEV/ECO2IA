import Modal from '../components/modal/modal';
import MattraductAI from '../components/mattraduct/mattraduct';
import { getUser } from '../util/api/user';

const Mattraduct = (props) => {
  return <div>{props.user.plan ? <MattraductAI /> : <Modal />}</div>;
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
