import { useState } from 'react';

import ExportPDF from './ExportPDF';
import dynamic from 'next/dynamic';
import ShareModal from './ShareModal';

import { ShareIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import { useTrainingPlanContent } from '../../hooks/useTrainingPlanContent';
import { MainSportCard } from './MainSportCard';

const PDFDownloadLinkDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false
  }
);

export const SportCoachResults = ({ user, responseObj }) => {
  const { content } = useTrainingPlanContent({ responseObj });

  // Estado para mostrar u ocultar los botones de compartir
  const [showShareButtons, setShowShareButtons] = useState(false);
  // Estado para realizar un seguimiento de los ejercicios completados

  // Maneja el clic en el botón de compartir
  const handleShareClick = () => {
    setShowShareButtons(!showShareButtons);
  };

  return (
    <div className="relative  mt-4 md:mt-8 w-full  p-6  rounded-lg ">
      <section className="absolute top-0 left-0 mt-[-30px] ml-4 z-40">
        <div className="flex space-x-2 ml-10">
          <button
            onClick={handleShareClick}
            className="flex items-center justify-center border-white bg-eco2MainColor hover:bg-eco2HoverColor text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 ease-in-out"
          >
            <ShareIcon className="h-5 w-5 mr-2" />
          </button>

          <PDFDownloadLinkDynamic
            document={<ExportPDF generateTrainingPlanContent={content} />}
            fileName="MARIASPORT.pdf"
          >
            <button className="flex items-center justify-center border-white bg-eco2MainColor hover:bg-eco2HoverColor text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 ease-in-out">
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            </button>
          </PDFDownloadLinkDynamic>
        </div>
        {showShareButtons && (
          <ShareModal generateTrainingPlanContent={content} />
        )}
      </section>
      {responseObj ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {responseObj?.resp?.map((day, index) => (
            <MainSportCard
              key={`day-${index}`}
              day={day}
              index={index}
              user={user}
            />
          ))}
        </section>
      ) : (
        <section>Intentar de nuevo</section>
      )}
    </div>
  );
};
