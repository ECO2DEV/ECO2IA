import IACard from './IACard';
import { IA_CARDS } from '../../constants/constans';

export default function DashboardSection(props) {
  // console.log('DashboardSection props', props?.user.IA_CARDS?.data);

  const iaCards = props?.user.IA_CARDS?.data;
  // console.log('iaCards', iaCards);

  return (
    <section className="w-full grid auto-rows-[380px] lg:auto-rows-[140px] grid-cols-8 gap-4 bg-lightColor dark:bg-darkColor ">
      {iaCards.map((ia) => {
        return (
          <IACard
            key={ia.id}
            id={ia.id}
            title={ia.attributes.title}
            description={ia.attributes.description}
            href={ia.attributes.href}
            screenShoot={ia.attributes.screenShoot}
            classNames={ia.attributes.classNames}
            keywords={ia.attributes.keywords}
            index={iaCards.length}
            score={ia.attributes.id_score.data}
          />
        );
      })}
    </section>
  );
}
