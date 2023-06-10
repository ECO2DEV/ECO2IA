import { getUser } from '../util/api/user';
import DashboardSection from '../components/dashboard/dashboard';
import Pricing from '../components/pricing_section/pricing';
import Modal from '../components/modal/modal';

export default function Dashboard(props) {
  // console.log(props.user.plan)
  // console.log(props.user)
  return (
    <div className="my-10 pb-10">
      {props.user.plan ? <DashboardSection /> : <Modal user={props.user} />}
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

  return {
    props: {
      user: result?.data,
      session: result?.session
    }
  };
}
