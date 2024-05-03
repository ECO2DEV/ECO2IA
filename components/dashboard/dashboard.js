import { useState } from 'react';
import IACard from './IACard';
import Head from 'next/head';
import { Search } from './Search';
import { IANotFound } from './IANotFound';

export default function DashboardSection(props) {
  // console.log('DashboardSection props', props?.user.IA_CARDS?.data);
  const iaCards = props?.user.IA_CARDS?.data;
  const [filterData, setFilterData] = useState(iaCards);
  const yourPlan = props?.user?.user?.plan ?? null;

  // console.log('yourPlan dashvoard', iaCards);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Ai Ecosystem dashboard" />
        <link rel="Eco2 icon" href="/eco2it_logo.jpeg" />
      </Head>
      <div className="flex flex-col justify-center gap-10 py-10">
        <Search
          iaCards={iaCards}
          setFilterData={setFilterData}
          filterData={filterData}
        />
        <section className="w-full grid auto-rows-[380px] lg:auto-rows-[140px] grid-cols-8 gap-2 mx-auto">
          {filterData.length > 0 ? (
            filterData.map((ia, index) => (
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
            ))
          ) : (
            <IANotFound />
          )}
        </section>
      </div>
    </>
  );
}
