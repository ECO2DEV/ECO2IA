import { getUser } from '../util/api/user';
import DashboardSection from '../components/dashboard/dashboard';
import { getAllIAs } from '../util/api/score_ias';
// import Modal from "../components/modal/modal";

export default function Dashboard(props) {
  // console.log(props);
  // console.log(props.user)
  return (
    // <div className="my-10 pb-10">
    //   {props?.user?.plan ? <DashboardSection /> : <Modal user={props.user} />}
    // </div>
    <div className="m-2 bg-lightColor dark:bg-darkColor">
      <DashboardSection user={props} />
    </div>
  );
}

Dashboard.getLayout = (page) => page;

export async function getServerSideProps(context) {
  const result = await getUser(context);

  if (!result) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin'
      }
    };
  }

  const res = await getAllIAs();

  return {
    props: {
      user: result?.data,
      session: result?.session,
      IA_CARDS: res ? res : null
    }
  };
}
