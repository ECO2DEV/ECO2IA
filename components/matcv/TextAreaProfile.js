import { useState } from 'react';
import CVSummary from './CVSummary';
import { DataMattCV } from '../../data/mattcv';

export const TextAreaProfile = ({ textProfile, setTextProfile }) => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen((prev) => !prev);
  }
  return (
    <>
      <form>
        <h2 className="text-xl font-bold"> {DataMattCV.ProfessionalSummary} </h2>
        <p className="text-xs mb-2">
          {DataMattCV.ProffesionalSummaryText}
        </p>
        <textarea
          value={textProfile ? textProfile : ''}
          onChange={(e) => setTextProfile(e.target.value)}
          className="w-full h-36 text-xs p-2 border rounded resize-none border focus:border-indigo-600"
        ></textarea>
      </form>
      <button
        onClick={handleModalOpen}
        className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-300"
      >
        {DataMattCV.GenerateWithAI}
      </button>
      {modalOpen && (
        <CVSummary onClose={handleModalOpen} setTextProfile={setTextProfile} />
      )}
    </>
  );
};
