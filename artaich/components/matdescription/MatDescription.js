import { useState } from 'react';
import DescriptionForm from './DescriptionForm';
import { DescriptionHeader } from './DescriptionHeader';
import { MatPosts } from './MatPosts';

export const MatDescription = (props) => {
  const [showMatDescription, setShowMatDescription] = useState(false);
  return (
    <section className="flex justify-center min-h-screen pb-4">
      {!showMatDescription ? (
        <DescriptionHeader setShowMatDescription={setShowMatDescription} />
      ) : (
        <div className="flex flex-col sm:flex-row w-full gap-2 relative">
          <DescriptionForm />
          <MatPosts />
        </div>
      )}
    </section>
  );
};
