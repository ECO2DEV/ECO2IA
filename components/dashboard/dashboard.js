import IACard from './IACard';
import { IA_CARDS } from '../../constants/constans';

export default function DashboardSection() {
  return (
    <section className="w-full grid auto-rows-[380px] lg:auto-rows-[140px] grid-cols-8 gap-4 dark:bg-darkColor">
      {IA_CARDS.map((ia) => {
        return <IACard key={ia.index} {...ia} />;
      })}
    </section>
  );
}
