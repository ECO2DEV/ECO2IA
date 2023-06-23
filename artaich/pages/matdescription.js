import { MatDescription } from '../components/matdescription/MatDescription';
import Modal from '../components/modal/modal';
import { getUser } from '../util/api/user';

export default function matdescription(props) {
  return (
    <div className="my-10">
      {props.user.plan ? <MatDescription user={props.user.id} /> : <Modal />}
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
