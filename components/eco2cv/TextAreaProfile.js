import { useState, useEffect } from 'react';
import CVSummary from './CVSummary';
import { DataEco2CV } from '../../data/eco2cv';

const resumLoren = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod sapien non justo feugiat, sed posuere risus luctus. Fusce at ante eu risus lacinia tincidunt ac non lacus. Sed non libero odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi viverra est nec ante venenatis, id suscipit libero finibus. Nulla at nisi vel nulla posuere viverra non nec nulla. Integer sed tristique libero. Nullam ultricies fermentum mauris, a suscipit velit faucibus at. Sed id lectus a magna malesuada rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vel felis eget sem volutpat vestibulum. Vivamus ullamcorper, nunc non consectetur fermentum, odio elit varius dui, in feugiat odio ante eu dolor. Donec aliquet, lacus non rhoncus fringilla, eros justo euismod purus, at aliquet tortor justo ac velit.'


export const TextAreaProfile = ({ textProfile, setTextProfile }) => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!textProfile) {
      // Establecer el resumen profesional predeterminado si textProfile no tiene contenido
      setTextProfile(resumLoren);
    }
  }, [setTextProfile, textProfile]); 

  function handleModalOpen() {
    setModalOpen((prev) => !prev);
  }
  return (
    <>
      <form>
        <h2 className="text-xl font-bold text-eco2MainColor">
          {' '}
          {DataEco2CV.ProfessionalSummary}{' '}
        </h2>
        <p className="text-xs mb-2">{DataEco2CV.ProffesionalSummaryText}</p>
        <textarea
          value={textProfile ? textProfile : resumLoren}
          onChange={(e) => setTextProfile(e.target.value)}
          className="w-full h-36 text-xs p-2 resize-none border-white rounded custom-input bg-darkBgCard dark:bg-white text-white dark:text-black"
        ></textarea>
      </form>
      <button
        onClick={handleModalOpen}
        className="gap-x-1.5 rounded-md px-3 py-2 mb-2 text-sm font-semibold bg-eco2MainColor hover:bg-eco2HoverColor text-white ring-1 ring-inset ring-gray-300"
      >
        {DataEco2CV.GenerateWithAI}
      </button>
      {modalOpen && (
        <CVSummary onClose={handleModalOpen} setTextProfile={setTextProfile} />
      )}
    </>
  );
};
