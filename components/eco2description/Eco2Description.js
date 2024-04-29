import { useState } from 'react';
import DescriptionForm from './DescriptionForm';
import { DescriptionHeader } from './DescriptionHeader';
import { Eco2Cards } from './Eco2Cards';

export const Eco2Description = () => {
  const [showMatDescription, setShowMatDescription] = useState(false);

  return (
    <section className="flex justify-center min-h-screen mx-10 pt-10">
      {!showMatDescription ? (
        <DescriptionHeader setShowMatDescription={setShowMatDescription} />
      ) : (
        <div className="flex flex-col justify-between md:flex-row md:justify-between w-full gap-8">
          <DescriptionForm />
          <Eco2Cards />
        </div>
      )}
    </section>
  );
};
