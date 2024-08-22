import { useState } from 'react';

import CardDashboard from './CardDashboard';
import Head from 'next/head';
import { Search } from './Search';
import { IANotFound } from './IANotFound';

export default function DashboardSection(props) {
  // console.log('DashboardSection props', props?.user.IA_CARDS?.data);
  const iaCards = props?.user.IA_CARDS?.data;
  const [filterData, setFilterData] = useState(iaCards);
  const yourPlan = props?.user?.user?.plan ?? null;

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Ai Ecosystem dashboard" />
        <link rel="Eco2 icon" href="/iconografia/eco2it_logo.jpeg" />
      </Head>
      <div className="flex flex-col justify-center gap-10 py-10">
        <Search
          iaCards={iaCards}
          setFilterData={setFilterData}
          filterData={filterData}
        />

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-2">
          {filterData.length > 0 ? (
            filterData.map((ia, index) => (
              <CardDashboard
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
        </ul>
      </div>
    </>
  );
}
