import { stepsGym } from '../../../constants/constans';
import { DataEco2Sport } from '../../../data/eco2sport';
import Loader from '../../loader/loader';
import { MagicAiIcon } from '../../icons/icons';
export const Days = ({ currentStep, formData, setFormData }) => {
  const actualStep = stepsGym[currentStep - 1];

  return (
    <article className="flex flex-col justify-center gap-4 ">
      <h2 className="text-center text-lg mt-1 ml-4 sm:mt-0 sm:ml-0 sm:text-3xl font-semibold py-10 sm:py-0">
        {actualStep.name}
      </h2>{' '}
      <fieldset className="flex flex-col">
        <label
          htmlFor="trainingDays"
          className="mb-1 text-gray-900 dark:text-white font-semibold"
        >
          {DataEco2Sport.NumberofTrainigns}
        </label>
        <select
          id="trainingDays"
          name="trainingDays"
          value={formData.trainingDays}
          onChange={(e) =>
            setFormData({ ...formData, trainingDays: e.target.value })
          }
          className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
        >
          <option value="1">{DataEco2Sport.OneDay}</option>
          <option value="2">{DataEco2Sport.TwoDays}</option>
          <option value="3">{DataEco2Sport.ThreeDays}</option>
          <option value="4">{DataEco2Sport.FourDays}</option>
          <option value="5">{DataEco2Sport.FiveDays}</option>
          <option value="6">{DataEco2Sport.SixDays}</option>
        </select>
      </fieldset>
      <button
        disabled={formData.submitting}
        className=" p-2 rounded-full bg-eco2MainColor w-full flex justify-center hover:opacity-75 transition-opacity duration-200"
        type="submit"
      >
        {formData.submitting ? <Loader /> : <MagicAiIcon />}
      </button>
    </article>
  );
};
