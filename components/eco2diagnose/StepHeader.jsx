import { twMerge } from 'tailwind-merge';

import { ArrowBigLeft, ArrowBigRight } from '../icons/icons';

export default function StepHeader({ currentStep, handleNext, handleBack }) {
  return (
    <div className='mb-4'>
      <article className="my-4" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className={twMerge(
              'h-2 rounded-full bg-eco2MainColor w-1',
              currentStep === 1 ? 'w-1' : currentStep === 2 ? 'w-1/2' : 'w-full'
            )}
          />
        </div>
        <div className="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
          <div className={twMerge("",
            currentStep === 1 ? 'text-eco2MainColor animate-bounce' : 'text-gray-600 dark:text-gray-400'
          )}>Consulta</div>
          <div className={twMerge("text-center",
            currentStep === 2 ? 'text-eco2MainColor animate-bounce' : 'text-gray-600 dark:text-gray-400'
          )}>Archivo</div>
          <div className={twMerge("text-right",
            currentStep === 3 ? 'text-eco2MainColor animate-bounce' : 'text-gray-600 dark:text-gray-400'
          )}>Resultado</div>
        </div>
      </article>
      <article className="flex justify-between items-center gap-4 ">
        <div title="anterior">
          {
            currentStep !== 1 ?(
              <ArrowBigLeft
                onClick={handleBack}
                className="w-10 h-10 mt-2 cursor-pointer hover:text-eco2MainColor transition-colors duration-200"
              />
            ) : (
              <div className="w-10 h-10 mt-2"/>
            )
          }
      
        </div>
        <p className="text-4xl text-center font-bold dark:text-gray-100 text-gray-900">
          MarIA Pre-Diagnostico 
        </p>
        <div title="siguiente">
          {
            currentStep !== 3 ? (
              <ArrowBigRight
                onClick={handleNext}
                className="w-10 h-10 mt-2 cursor-pointer hover:text-eco2MainColor transition-colors duration-200"
              />
            ) : (
              <div className="w-10 h-10 mt-2"/>
            )
          }
        </div>
      </article>
    </div>
  );
}
