import { getUser } from '../util/api/user';
import Profile from '../components/profile/profile';
export default function profile(props) {
  const user = props.user;
  return <Profile user={user} />;
}

export const getServerSideProps = async (context) => {
  const result = await getUser(context);

  if (!result) {
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
