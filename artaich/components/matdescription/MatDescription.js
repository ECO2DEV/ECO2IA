import { useState } from 'react';
import DescriptionForm from './DescriptionForm';
import { DescriptionHeader } from './DescriptionHeader';
import { MatPosts } from './MatPosts';

export const MatDescription = (props) => {
  const [showMatDescription, setShowMatDescription] = useState(false);
  return (
    <section className="flex flex-col items-center justify-center min-h-screen ">
      {!showMatDescription ? (
        <DescriptionHeader setShowMatDescription={setShowMatDescription} />
      ) : (
        <div className="flex flex-col sm:flex-row w-full gap-5 -mt-10 sm:-mt-20 lg:-mt-32 xl:-mt-44">
          <DescriptionForm />
          <MatPosts />
        </div>
      )}
    </section>
  );
};
