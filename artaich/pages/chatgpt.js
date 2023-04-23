import ChatGpt from '../components/chatgpt/chatgpt';
import { getUser } from '../util/api/user';

export default function chatgpt(props) {
  return <ChatGpt user={props.user.id} />;
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
