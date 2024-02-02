//components/sport_coach/sportCoach.js
import { useContext, useState } from 'react';
import { InputField } from './InputField';
import { SportButtonHelper } from './MattSportCoachHelper';
import { PromptContext } from '../../context/prompts/PromptContext';
import { sendTrainingPlanRequest } from '../../util/api/sendTrainingPlanRequest';
import { SportCoachResults } from './MattSportCoachResults';
import { useSportCoach } from '../../hooks/useSportCoach';
import { WelcomeSportCoach } from './welcomeSportCoach';
import { DataMattSport } from '../../data/mattsport';
import { toast } from 'react-hot-toast';
import Loader from '../loader/loader';
export const SportCoachIA = (props) => {
  // Estados para almacenar los datos del formulario
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  // const [goal, setGoal] = useState("");
  const [trainingDays, setTrainingDays] = useState('1');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  // estado para mostrar o no el componente de ayuda
  const [showWelcome, setShowWelcome] = useState(true);

  const user = props.user;

  // Obtener los datos del entrenador deportivo personalizado
  const { data, mutate } = useSportCoach(user);
  // inicializamos el estado del prompt con el valor "Select an option"
  const { prompt, setPrompt, setResponse, promptTokens } =
    useContext(PromptContext);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
    // setShowResults(false);
  };

  // Función para enviar la solicitud de plan de entrenamiento
  const fetchData = async () => {
    if (!prompt) {
      // console.log(setPromptTokens);
      setError('Veuillez taper quelque chose avant de soumettre');
    } else {
      setSubmitting(true);
      // Realiza la llamada a la API para enviar la solicitud de plan de entrenamiento
      sendTrainingPlanRequest({
        prompt: prompt,
        weight: weight,
        age: age,
        goal: prompt,
        language: 'Spanish',
        trainingDays: trainingDays,
        user: user
      })
        .then((response) => {
          setResponse(response?.data?.data);
          mutate({ data: [...data.data, response?.data], ...data });
          setShowResults(true);
        })
        .catch((error) => {
          console.log(error);
          setError(
            "Une erreur s'est produite lors de la récupération des données."
          );
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handlePromptChange = (e) => {
    const { value } = e.target;
    if (value === DataMattSport.SelectOption) {
      toast.error('Veuillez sélectionner un objectif');
      return;
    }
    setPrompt(value);
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'trainingDays') {
      setTrainingDays(value);
    }
  };

  const handleOpenHelpers = () => {
    setShowWelcome(true);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center items-center text-[#21c284] mb-4">
        <span>
          Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
        </span>
      </div>

      {!showResults ? (
        <WelcomeSportCoach className="mb-8 bg-[#21c284]" />
      ) : (
        (
          <div className="flex justify-center h-[60rem]">
            <div className="md:mt-8 lg:max-w-xl xl:max-w-2xl">
              <SportCoachResults
                weight={weight}
                age={age}
                goal={prompt}
                trainingDays={trainingDays}
                user={user}
              />
            </div>
          </div>
        ) && <SportCoachResults user={user} />
      )}
      <div className="bottom-3 z-20 sticky grid xl:grid-cols-[minmax(auto,_1fr)_100px] md:fixed md:bottom-3 xl:fixed p-4 bg-gray-200 dark:bg-zinc-900/80">
        <form
          onSubmit={handleSubmit}
          className="grid xl:grid-cols-5 md:grid-cols-5 items-center gap-4 grid-cols-2"
        >
          <fieldset>
            <label htmlFor="">{DataMattSport.Weight}</label>
            <InputField
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="text"
              className="mt-1 px-4 py-2 w-full rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:text-zinc-900"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="">{DataMattSport.Age}</label>
            <InputField
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className="mt-1 px-4 py-2 w-full rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </fieldset>
          <div className="">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium"
            >
              {DataMattSport.Goal}
            </label>
            <select
              id="prompt"
              name="prompt"
              // value={""}
              defaultValue={prompt}
              onChange={handlePromptChange}
              className="mt-1 px-4 py-2 border w-full border-gray-300 rounded-md bg-[#21c284] focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              <option value={prompt}>{DataMattSport.SelectOption}</option>

              <option value="weight loss"> {DataMattSport.WeightLoss}</option>
              <option value="muscle building">
                {DataMattSport.MuscleBuilding}
              </option>
              <option value="mass"> {DataMattSport.Mass} </option>
              <option value="crossfit"> {DataMattSport.Crossfit} </option>
              <option value="dry"> {DataMattSport.Dry} </option>
            </select>
          </div>
          <div className="">
            <label
              htmlFor="trainingDays"
              className="block text-sm font-medium"
            >
              {DataMattSport.NumberofTrainigns}
            </label>
            <select
              id="trainingDays"
              name="trainingDays"
              value={trainingDays}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full bg-[#21c284] focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              <option value="1"> {DataMattSport.OneDay} </option>
              <option value="2"> {DataMattSport.TwoDays} </option>
              <option value="3"> {DataMattSport.ThreeDays} </option>
              <option value="4"> {DataMattSport.FourDays} </option>
              <option value="5"> {DataMattSport.FiveDays} </option>
              <option value="6"> {DataMattSport.SixDays} </option>
              <option value="7"> {DataMattSport.SevenDays} </option>
            </select>
          </div>
          <div className="md:ml-2 w-full grid-cols-1">
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-7 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              {submitting ? <Loader /> : DataMattSport.GetButton}
            </button>
          </div>
        </form>
        <SportButtonHelper onClick={handleOpenHelpers} />
      </div>
      {error && <h4 className="text-red-500 text-center">{error}</h4>}
    </div>
  );
};
