import { useState } from 'react';
import DescriptionForm from './DescriptionForm';
import { DescriptionHeader } from './DescriptionHeader';
import { Eco2Cards } from './Eco2Cards';

export const Eco2Description = () => {
  const [showMatDescription, setShowMatDescription] = useState(false);
  return (
    <section className="flex justify-center min-h-screen pb-4">
      {!showMatDescription ? (
        <DescriptionHeader setShowMatDescription={setShowMatDescription} />
      ) : (
        <div className="flex flex-col sm:flex-row w-full gap-2 relative">
          <DescriptionForm />
          <Eco2Cards />
        </div>
      )}
    </section>
  );
};
