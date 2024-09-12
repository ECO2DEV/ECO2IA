import { stepsGym } from '../../../constants/constans';
import { DataEco2Sport } from '../../../data/eco2sport';

export const Goal = ({ formData, setFormData, currentStep }) => {

  const actualStep = stepsGym[currentStep - 1];
  return (
    <article className="flex flex-col justify-center gap-4">
      <h2 className="text-center text-lg mt-1 ml-4 sm:mt-0 sm:ml-0 sm:text-3xl font-semibold py-10 sm:py-0">
   
        {actualStep.name}
      </h2>
      <fieldset className="flex flex-col">
        <label
          htmlFor="goal"
          className="mb-1 text-gray-900 dark:text-white font-semibold"
        >
          {DataEco2Sport.Goal}
        </label>
        <select
          id="goal"
          name="goal"
          defaultValue={formData.goal}
          onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
          // onChange={handlePromptChange}
          className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
        >
          <option value="">{DataEco2Sport.SelectOption}</option>
          <option value="perdida peso">{DataEco2Sport.WeightLoss}</option>
          <option value="fortalecimiento muscular">
            {DataEco2Sport.MuscleBuilding}
          </option>
          <option value="aumento peso">{DataEco2Sport.Mass}</option>
          <option value="crossfit">{DataEco2Sport.Crossfit}</option>
          <option value="pliométrico">{DataEco2Sport.pliométrico}</option>
          {/* <option value="yoga">{DataEco2Sport.yoga}</option> */}
        </select>
      </fieldset>
    </article>
  );
};

// import { useContext, useState, useEffect } from 'react';
// import { InputField } from './InputField';
// import { PromptContext } from '../../context/prompts/PromptContext';
// import { sendTrainingPlanRequest } from '../../util/api/sendTrainingPlanRequest';
// import { SportCoachResults } from './Eco2SportCoachResults';
// import { DataEco2Sport } from '../../data/eco2sport';
// import { toast } from 'react-hot-toast';
// import Loader from '../loader/loader';
// import { fetchDataExerciseDB } from '../../util/api/SportFetch';
// import { exerciseUrl } from '../../util/api/SportFetch';
// import { MagicAiIcon } from '../icons/icons';
// import { useLocalStorageWithExpiration } from '../../hooks/useLocalStorageWithExpiration';
// import StepGym from './StepGym';

// export const SportCoachIA = (props) => {
//   const [formData, setFormData] = useState({
//     weight: '',
//     height: '',
//     age: '',
//     trainingDays: '1',
//     submitting: false,
//     error: ''
//   });

//   const user = props.user;
//   const [storedValue, setStoredValue] = useLocalStorageWithExpiration({
//     key: 'exercises',
//     initialValue: null
//   });

//   const { prompt, setPrompt, setResponse } = useContext(PromptContext);
//   const [responseObj, setResponseObj] = useState(null);

//   useEffect(() => {
//     const localStore = localStorage.getItem('execResponse');
//     if (localStore) {
//       const parseResponse = JSON.parse(localStore);
//       setResponseObj(parseResponse);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await fetchData();

//     if (!storedValue) {
//       const respo = await fetchDataExerciseDB(
//         `${exerciseUrl}/exercises?limit=1300`
//       );
//       setStoredValue(respo);
//     }
//   };

//   const fetchData = async () => {
//     if (!prompt) {
//       setFormData((prevState) => ({
//         ...prevState,
//         error: 'Por favor, escriba algo antes de enviar'
//       }));
//     } else {
//       setFormData((prevState) => ({ ...prevState, submitting: true }));
//       sendTrainingPlanRequest({
//         prompt,
//         weight: formData.weight,
//         height: formData.height,
//         age: formData.age,
//         trainingDays: formData.trainingDays,
//         goal: prompt,
//         language: 'Spanish',
//         user
//       })
//         .then((response) => {
//           setResponse(response?.data?.data);
//           setResponseObj(response?.data?.data);
//           if (response?.data?.data) {
//             localStorage.setItem(
//               'execResponse',
//               JSON.stringify(response?.data?.data)
//             );
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//           setFormData((prevState) => ({
//             ...prevState,
//             error: 'Se produjo un error al recuperar los datos'
//           }));
//         })
//         .finally(() => {
//           setFormData((prevState) => ({ ...prevState, submitting: false }));
//         });
//     }
//   };

//   const handlePromptChange = (e) => {
//     const { value } = e.target;
//     if (value === DataEco2Sport.SelectOption) {
//       toast.error('Por favor, seleccione un objetivo');
//       return;
//     }
//     setPrompt(value);
//   };

//   const onHandleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <>
//       <div className="relative mt-4 md:mt-8 lg:max-w-[60rem] xl:max-w-[90rem] mx-auto p-6 bg-cardBackground rounded-lg shadow-md">
//         <h1 className="text-5xl text-center mb-[40px] font-semibold dark:text-white">
//           María: Tu entrenadora personal
//         </h1>
//         {!responseObj ? (
//           <StepGym />
//         ) : (
//           <div className="flex justify-center h-fit">
//             <div className="md:mt-8 w-full h-fit">
//               <SportCoachResults user={user} responseObj={responseObj} />
//             </div>
//           </div>
//         )}

//         <div className="rounded-lg shadow-md p-4 mt-10 max-w-4xl w-full mx-auto">
//           <form onSubmit={handleSubmit} className="grid gap-4 ">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//               <fieldset className="flex flex-col">
//                 <label
//                   htmlFor="weight"
//                   className="mb-1 text-gray-900 dark:text-white font-semibold "
//                 >
//                   {DataEco2Sport.Weight}
//                 </label>
//                 <InputField
//                   label={DataEco2Sport.Weight}
//                   name="weight"
//                   value={formData.weight}
//                   onChange={onHandleChange}
//                   type="text"
//                   id="weight"
//                 />
//               </fieldset>
//               <fieldset className="flex flex-col">
//                 <div className="flex gap-3">
//                   <div className="flex flex-col w-full">
//                     <label
//                       htmlFor="age"
//                       className="mb-1 text-gray-900 dark:text-white font-semibold"
//                     >
//                       {DataEco2Sport.Age}
//                     </label>
//                     <InputField
//                       name="age"
//                       value={formData.age}
//                       onChange={onHandleChange}
//                       type="text"
//                       placeholder="30"
//                       id="age"
//                     />
//                   </div>
//                   <div className="flex flex-col w-full">
//                     <label
//                       htmlFor="height"
//                       className="mb-1 text-gray-900 dark:text-white font-semibold"
//                     >
//                       Altura
//                     </label>
//                     <InputField
//                       name="height"
//                       value={formData.height}
//                       onChange={onHandleChange}
//                       type="text"
//                       placeholder="170cm"
//                       id="height"
//                       required
//                     />
//                   </div>
//                 </div>
//               </fieldset>

//               <fieldset className="flex flex-col">
//                 <label
//                   htmlFor="prompt"
//                   className="mb-1 text-gray-900 dark:text-white font-semibold"
//                 >
//                   {DataEco2Sport.Goal}
//                 </label>
//                 <select
//                   id="prompt"
//                   name="prompt"
//                   defaultValue={prompt}
//                   onChange={handlePromptChange}
//                   className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
//                 >
//                   <option value="">{DataEco2Sport.SelectOption}</option>
//                   <option value="weight loss">
//                     {DataEco2Sport.WeightLoss}
//                   </option>
//                   <option value="muscle building">
//                     {DataEco2Sport.MuscleBuilding}
//                   </option>
//                   <option value="mass">{DataEco2Sport.Mass}</option>
//                   <option value="crossfit">{DataEco2Sport.Crossfit}</option>
//                   <option value="dry">{DataEco2Sport.Dry}</option>
//                 </select>
//               </fieldset>
//               <fieldset className="flex flex-col">
//                 <label
//                   htmlFor="trainingDays"
//                   className="mb-1 text-gray-900 dark:text-white font-semibold"
//                 >
//                   {DataEco2Sport.NumberofTrainigns}
//                 </label>
//                 <select
//                   id="trainingDays"
//                   name="trainingDays"
//                   value={formData.trainingDays}
//                   onChange={onHandleChange}
//                   className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
//                 >
//                   <option value="1">{DataEco2Sport.OneDay}</option>
//                   <option value="2">{DataEco2Sport.TwoDays}</option>
//                   <option value="3">{DataEco2Sport.ThreeDays}</option>
//                   <option value="4">{DataEco2Sport.FourDays}</option>
//                   <option value="5">{DataEco2Sport.FiveDays}</option>
//                   <option value="6">{DataEco2Sport.SixDays}</option>
//                 </select>
//               </fieldset>
//             </div>
//             <button
//               type="submit"
//               disabled={formData.submitting}
//               className="flex justify-center items-center h-10 text-white text-center bg-eco2MainColor dark:hover:bg-eco2HoverColor hover:bg-eco2HoverColor rounded-full w-full lg:w-auto px-10 py-2"
//             >
//               {formData.submitting ? (
//                 <Loader />
//               ) : (
//                 <div className="flex justify-center items-center gap-2">
//                   {DataEco2Sport.GetButton}
//                   <MagicAiIcon />
//                 </div>
//               )}
//             </button>
//           </form>
//           <div className="flex items-center justify-center mr-36">
//             {/* <SportButtonHelper onClick={handleOpenHelpers} /> */}
//           </div>
//         </div>
//         {formData.error && (
//           <h4 className="text-red-500 text-center">{formData.error}</h4>
//         )}
//       </div>
//     </>
//   );
// };
