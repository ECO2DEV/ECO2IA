//components/sport_coach/sportCoach.js
import { useContext, useState } from 'react';
import { InputField } from './InputField';
import { SportButtonHelper } from './Eco2SportCoachHelper';
import { PromptContext } from '../../context/prompts/PromptContext';
import { sendTrainingPlanRequest } from '../../util/api/sendTrainingPlanRequest';
import { SportCoachResults } from './Eco2SportCoachResults';
import { useSportCoach } from '../../hooks/useSportCoach';
import { WelcomeSportCoach } from './welcomeSportCoach';
import { DataEco2Sport } from '../../data/eco2sport';
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
      setError('Por favor, escriba algo antes de enviar');
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
          setError('Se produjo un error al recuperar los datos');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handlePromptChange = (e) => {
    const { value } = e.target;
    if (value === DataEco2Sport.SelectOption) {
      toast.error('Por favor, seleccione un objetivo');
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
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex justify-center items-center text-gray-900 dark:text-gray-100 mb-4">
        <span>
          Puntos utilizados para la pregunta : {promptTokens}&nbsp;&nbsp;
        </span>
      </div>

      {!showResults ? (
        <WelcomeSportCoach className="mb-8 bg-eco2MainColor" />
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
      <div className="bottom-3 z-20 sticky grid xl:grid-cols-[minmax(auto,_1fr)_100px] md:fixed md:bottom-3 xl:fixed p-4 bg-gray-200 dark:bg-zinc-900/100">
        <form
          onSubmit={handleSubmit}
          className="grid xl:grid-cols-5 md:grid-cols-5 items-center gap-4 grid-cols-2"
        >
          <fieldset>
            <label htmlFor="">{DataEco2Sport.Weight}</label>
            <InputField
              name="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="text"
              className="mt-1 px-4 py-2 w-full rounded-md focus:ring-emerald-500 dark:text-black focus:border-emerald-500 sm:text-sm"
            />
          </fieldset>
          <fieldset>
            <label htmlFor="">{DataEco2Sport.Age}</label>
            <InputField
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="text"
              className="mt-1 px-4 py-2 w-full rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </fieldset>
          <div className="">
            <label htmlFor="prompt" className="block text-sm font-medium">
              {DataEco2Sport.Goal}
            </label>
            <select
              id="prompt"
              name="prompt"
              // value={""}
              defaultValue={prompt}
              onChange={handlePromptChange}
              className="mt-1 px-4 py-2 border w-full border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm dark:text-black"
            >
              <option value={prompt}>{DataEco2Sport.SelectOption}</option>

              <option value="weight loss"> {DataEco2Sport.WeightLoss}</option>
              <option value="muscle building">
                {DataEco2Sport.MuscleBuilding}
              </option>
              <option value="mass"> {DataEco2Sport.Mass} </option>
              <option value="crossfit"> {DataEco2Sport.Crossfit} </option>
              <option value="dry"> {DataEco2Sport.Dry} </option>
            </select>
          </div>
          <div className="">
            <label htmlFor="trainingDays" className="block text-sm font-medium">
              {DataEco2Sport.NumberofTrainigns}
            </label>
            <select
              id="trainingDays"
              name="trainingDays"
              value={trainingDays}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full dark:text-black focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              <option value="1"> {DataEco2Sport.OneDay} </option>
              <option value="2"> {DataEco2Sport.TwoDays} </option>
              <option value="3"> {DataEco2Sport.ThreeDays} </option>
              <option value="4"> {DataEco2Sport.FourDays} </option>
              <option value="5"> {DataEco2Sport.FiveDays} </option>
              <option value="6"> {DataEco2Sport.SixDays} </option>
              <option value="7"> {DataEco2Sport.SevenDays} </option>
            </select>
          </div>
          <div className="md:ml-2 w-full grid-cols-1">
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 h-10 text-white bg-eco2MainColor hover:bg-eco2HoverColor font-medium rounded-full text-sm px-7 py-2 mr-2"
            >
              {submitting ? <Loader /> : DataEco2Sport.GetButton}
            </button>
          </div>
        </form>
        <SportButtonHelper onClick={handleOpenHelpers} />
      </div>
      {error && <h4 className="text-red-500 text-center">{error}</h4>}
    </div>
  );
};
