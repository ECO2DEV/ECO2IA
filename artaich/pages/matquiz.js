import { MatquizAI } from '../components/matquiz/MatquizAI';
import Modal from '../components/modal/modal';

import { getUser } from '../util/api/user';

const Matquiz = (props) => {
  return (
    <div>
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
