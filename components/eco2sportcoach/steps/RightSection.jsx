import { stepsGym } from '../../../constants/constans';
export const RightSection = ({ currentStep, handleNext }) => {
  const actualStep = stepsGym[currentStep - 1];

  return (
    <article className="flex flex-col w-full">
      <img
        className="w-full h-80 rounded-2xl"
        src={actualStep.image}
        alt={actualStep.name}
      />
      <div className="grid grid-cols-5 gap-4 mt-4">
        <h3 className="text-pretty text-left text-lg font-normal col-span-3 mx-auto">
          {actualStep.phare}
        </h3>
        <button
          disabled={currentStep === 5}
          onClick={handleNext}
          className={`col-span-2 px-2 m-auto hover:opacity-75 transition-opacity duration-200 py-2 rounded-full bg-eco2MainColor ${
            currentStep === 5 && 'hidden'
          }`}
        >
          Siguiente
        </button>
      </div>
    </article>
  );
};
