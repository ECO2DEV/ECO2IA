import Modal from '../components/modal/modal';
import MatcvIA from '../components/matcv/Matcv';
import { getUser } from '../util/api/user';

const Matcv = (props) => {
  return <div>{props.user.plan ? <MatcvIA /> : <Modal />}</div>;
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

export default Matcv;
