//components/sport_coach/sportCoach.js
import { useContext, useState } from "react";
import { InputField } from "./InputField";
import { SportButtonHelper } from "./Eco2SportCoachHelper";
import { PromptContext } from "../../context/prompts/PromptContext";
import { sendTrainingPlanRequest } from "../../util/api/sendTrainingPlanRequest";
import { SportCoachResults } from "./Eco2SportCoachResults";
import { useSportCoach } from "../../hooks/useSportCoach";
import { WelcomeSportCoach } from "./welcomeSportCoach";
import { DataEco2Sport } from "../../data/eco2sport";
import { toast } from "react-hot-toast";
import Loader from "../loader/loader";
export const SportCoachIA = (props) => {
  // Estados para almacenar los datos del formulario
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  // const [goal, setGoal] = useState("");
  const [trainingDays, setTrainingDays] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
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
      setError("Por favor, escriba algo antes de enviar");
    } else {
      setSubmitting(true);
      // Realiza la llamada a la API para enviar la solicitud de plan de entrenamiento
      sendTrainingPlanRequest({
        prompt: prompt,
        weight: weight,
        age: age,
        goal: prompt,
        language: "Spanish",
        trainingDays: trainingDays,
        user: user,
      })
        .then((response) => {
          setResponse(response?.data?.data);
          mutate({ data: [...data.data, response?.data], ...data });
          setShowResults(true);
        })
        .catch((error) => {
          console.log(error);
          setError("Se produjo un error al recuperar los datos");
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  const handlePromptChange = (e) => {
    const { value } = e.target;
    if (value === DataEco2Sport.SelectOption) {
      toast.error("Por favor, seleccione un objetivo");
      return;
    }
    setPrompt(value);
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "trainingDays") {
      setTrainingDays(value);
    }
  };

  const handleOpenHelpers = () => {
    setShowWelcome(true);
    setShowResults(false);
  };

  return (
    <>
      <div className="relative mt-4 md:mt-8 lg:max-w-[60rem] xl:max-w-[90rem] mx-auto p-6 bg-cardBackground rounded-lg shadow-md">
        {/* text-5xl text-center mb-[40px] font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400 via-green-400 to-blue-400 via-indigo-400 to-purple-500 */}
        <h1 className="text-5xl text-center mb-[40px] font-semibold dark:text-white">
          María: Tu entrenadora personal
        </h1>
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

        <div className="rounded-lg shadow-md p-4 mt-10 max-w-4xl w-full mx-auto">
          <form onSubmit={handleSubmit} className="grid gap-4 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <fieldset className="flex flex-col">
                <label
                  htmlFor=""
                  className="mb-1 text-gray-900 dark:text-white font-semibold "
                >
                  {DataEco2Sport.Weight}
                </label>
                <InputField
                  name="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  type="text"
                  placeholder="Peso"
                  className=""
                />
              </fieldset>
              <fieldset className="flex flex-col">
                <label
                  htmlFor=""
                  className="mb-1 text-gray-900 dark:text-white font-semibold"
                >
                  {DataEco2Sport.Age}
                </label>
                <InputField
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  placeholder="Edad"
                />
              </fieldset>

              <fieldset className="flex flex-col">
                <label
                  htmlFor="prompt"
                  className="mb-1 text-gray-900 dark:text-white font-semibold"
                >
                  {DataEco2Sport.Goal}
                </label>
                <select
                  id="prompt"
                  name="prompt"
                  // value={""}
                  defaultValue={prompt}
                  onChange={handlePromptChange}
                  className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                >
                  <option value={prompt}>{DataEco2Sport.SelectOption}</option>

                  <option value="weight loss">
                    {" "}
                    {DataEco2Sport.WeightLoss}
                  </option>
                  <option value="muscle building">
                    {DataEco2Sport.MuscleBuilding}
                  </option>
                  <option value="mass"> {DataEco2Sport.Mass} </option>
                  <option value="crossfit"> {DataEco2Sport.Crossfit} </option>
                  <option value="dry"> {DataEco2Sport.Dry} </option>
                </select>
              </fieldset>
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
                  value={trainingDays}
                  onChange={handleChange}
                  className="block w-full rounded-md border-eco2MainColor dark:border-white custom-input bg-white dark:bg-darkBgCard px-3.5 py-2 text-black dark:text-white shadow-sm ring-1 sm:text-sm sm:leading-6"
                >
                  <option value="1"> {DataEco2Sport.OneDay} </option>
                  <option value="2"> {DataEco2Sport.TwoDays} </option>
                  <option value="3"> {DataEco2Sport.ThreeDays} </option>
                  <option value="4"> {DataEco2Sport.FourDays} </option>
                  <option value="5"> {DataEco2Sport.FiveDays} </option>
                  <option value="6"> {DataEco2Sport.SixDays} </option>
                  <option value="7"> {DataEco2Sport.SevenDays} </option>
                </select>
              </fieldset>
            </div>
            <div className="text-start md:text-center">
              <button
                type="submit"
                disabled={submitting}
                className="h-10 text-white text-center bg-eco2MainColor  dark:hover:bg-eco2HoverColor hover:bg-eco2HoverColor rounded-full w-full lg:w-auto px-10 py-2"
              >
                {submitting ? <Loader /> : DataEco2Sport.GetButton}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mr-36">
            {/* <SportButtonHelper onClick={handleOpenHelpers} /> */}
          </div>
        </div>

        <div className="flex justify-center items-center text-eco2MainColor font-medium dark:text-gray-100 mb-4">
          <span>
            Puntos utilizados para la pregunta : {promptTokens}&nbsp;&nbsp;
          </span>
        </div>

        {error && <h4 className="text-red-500 text-center">{error}</h4>}
      </div>
    </>
  );
};
