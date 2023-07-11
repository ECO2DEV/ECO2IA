import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import DescriptionForm from './DescriptionForm';
import { DescriptionHeader } from './DescriptionHeader';
import { MatCards } from './MatCards';

export const MatDescription = (props) => {
  const { setResponse } = useContext(PromptContext);
  useEffect(() => {
    setResponse('');
  }, []);

  const [showMatDescription, setShowMatDescription] = useState(false);
  return (
    <section className="flex justify-center min-h-screen pb-4">
      {!showMatDescription ? (
        <DescriptionHeader setShowMatDescription={setShowMatDescription} />
      ) : (
        <div className="flex flex-col sm:flex-row w-full gap-2 relative">
          <DescriptionForm />
          <MatCards />
        </div>
      )}
    </section>
  );
};
