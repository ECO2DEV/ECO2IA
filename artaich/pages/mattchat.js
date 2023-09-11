import ChatGpt from '../components/chatgpt/chatgpt';
import Modal from '../components/modal/modal';
import { getUser } from '../util/api/user';

export default function chatgpt(props) {


  return (
    <div className="my-10">
    {props.user.plan ? <ChatGpt user={props.user.id} />: <Modal />}
  </div>
  )
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
