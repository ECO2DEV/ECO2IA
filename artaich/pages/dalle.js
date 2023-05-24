import DalleIA from '../components/dalle/dalle';
import Modal from '../components/modal/modal';
import { getUser } from '../util/api/user';

export default function Dalle(props) {
  return <div className="">{props.user.plan ? <DalleIA /> : <Modal />}</div>;
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

// export const getServerSideProps = async (context) => {
//   let headers = {}
//   const session = await getSession(context);
//   console.log("Session : " + JSON.stringify(session));
// //   if (session) {
// //     headers = {Authorization: `Bearer ${session.jwt}`};
// //   }
//   let data = 'xxx'
//   return {props: {data: data}} ;

// }
