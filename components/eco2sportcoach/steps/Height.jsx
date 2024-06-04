import { stepsGym } from '../../../constants/constans';
export const Height = ({ formData, setFormData, currentStep }) => {
  const actualStep = stepsGym[currentStep - 1];
  return (
    <article className='flex flex-col justify-center gap-4'>
    <h2 className="text-center text-lg mt-1 ml-4 sm:mt-0 sm:ml-0 sm:text-3xl font-semibold py-10 sm:py-0">
   {actualStep.name}</h2>
      <label htmlFor='height' className='relative text-left text-eco2MainColor text-xl font-semibold'>
        Altura 
      <input
        autoComplete="off"
        className="absolute -bottom-2 right-0  mx-auto w-1/2 text-white text-center bg-darkColor dark:bg-lightColor dark:text-gray-900 rounded-full border-none outline-none focus:border-none focus:outline-none focus:ring-0"
        type="text"
        name="height"
        id="height"
        placeholder="1.70"
        value={formData.height}
        onChange={(e)=> setFormData({ ...formData, height: e.target.value })}
        />
        </label>
    </article>
  );
};
