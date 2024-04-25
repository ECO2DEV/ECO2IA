import Features from '../components/features_section/features';
import Hero from '../components/hero_section/hero';
import { ProjectsIA } from '../components/proyectsIA';

import { getUser } from '../util/api/user';
import Pricing from '../components/pricing_section/pricing';

export default function Home(props) {
  //console.log("User connected:" + JSON.stringify(props.user))

  const user = props?.user || null;

  return (
    <>
      <Hero user={user} />
      <Features />
      <Pricing user={user} />
      <ProjectsIA />
      {/* <LandingPage /> */}
    </>
  );
}

export const getServerSideProps = async (context) => {
  const result = await getUser(context);

  // console.log('User connected:' + JSON.stringify(data));
  return {
    props: {
      user: JSON.stringify(result?.data) || null,
      session: result?.session || null
    }
  };
};
