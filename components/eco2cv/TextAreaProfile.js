import { useState } from 'react';
import CVSummary from './CVSummary';
import { DataEco2CV } from '../../data/eco2cv';

export const TextAreaProfile = ({ textProfile, setTextProfile }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen((prev) => !prev);
  }
  return (
    <>
      <form>
        <h2 className="text-xl font-bold"> {DataEco2CV.ProfessionalSummary} </h2>
        <p className="text-xs mb-2">
          {DataEco2CV.ProffesionalSummaryText}
        </p>
        <textarea
          value={textProfile ? textProfile : ''}
          onChange={(e) => setTextProfile(e.target.value)}
          className="w-full h-36 text-xs p-2 border rounded resize-none dark:text-zinc-900 dark:bg-[#21c284] focus:border-emerald-600"
        ></textarea>
      </form>
      <button
        onClick={handleModalOpen}
        className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-emerald-600 text-white ring-1 ring-inset ring-gray-300"
      >
        {DataEco2CV.GenerateWithAI}
      </button>
      {modalOpen && (
        <CVSummary onClose={handleModalOpen} setTextProfile={setTextProfile} />
      )}
    </>
  );
};
