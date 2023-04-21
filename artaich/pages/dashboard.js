import { getUser } from '../util/api/user';
import DashboardSection from '../components/dashboard/dashboard';

export default function Dashboard() {
  return (
    <div className="my-10">
      <DashboardSection />
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
