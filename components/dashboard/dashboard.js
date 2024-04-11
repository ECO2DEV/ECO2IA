import IACard from './IACard';
import Head from 'next/head';

export default function DashboardSection(props) {
  // console.log('DashboardSection props', props?.user.IA_CARDS?.data);

  const iaCards = props?.user.IA_CARDS?.data;
  const yourPlan = props?.user?.user?.plan ?? null;

  // console.log('yourPlan dashvoard', yourPlan);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Ai Ecosystem dashboard" />
        <link rel="Eco2 icon" href="/eco2it_logo.jpeg" />
      </Head>
      <section className="w-full grid auto-rows-[380px] lg:auto-rows-[140px] grid-cols-8 gap-4 bg-lightColor dark:bg-darkColor mx-auto">
        {iaCards.map((ia, index) => {
          return (
            <IACard
              plan={yourPlan}
              key={ia.id}
              id={ia.id}
              title={ia.attributes.title}
              description={ia.attributes.description}
              href={ia.attributes.href}
              screenShoot={ia.attributes.screenShoot}
              keywords={ia.attributes.keywords}
              quantity={iaCards.length}
              index={index}
              score={ia.attributes.id_score.data}
            />
          );
        })}
      </section>
    </>
  );
}
