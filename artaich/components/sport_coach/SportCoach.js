import { useContext, useState } from "react";
import { InputField } from "./InputField";
import { SportButtonHelper } from "./SportCoach_Helper";
import { PromptContext } from "../../context/prompts/PromptContext";
import { sendTrainingPlanRequest } from "../../util/api/sendTrainingPlanRequest";
import { SportCoachResults } from "./SportCoachResults";
import { useSportCoach } from "../../hooks/useSportCoach";
import { WelcomeSport } from "./welcomesport";
import { DataMattSport } from "../../data/mattsport";

export const SportCoachIA = (props) => {
  // Estados para almacenar los datos del formulario
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  // const [goal, setGoal] = useState("");
  const [trainingDays, setTrainingDays] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  const user = props.user;

  // Obtener los datos del entrenador deportivo personalizado
  const { data, mutate } = useSportCoach(user);
  // Obtener los datos y funciones del contexto de prompts
  const { prompt, setPrompt, setResponse, setPromptTokens, promptTokens } =
    useContext(PromptContext);

  // Función para enviar la solicitud de plan de entrenamiento
  const fetchData = async () => {
    if (!prompt) {
      console.log(setPromptTokens);
      setError("Veuillez taper quelque chose avant de soumettre");
    } else {
      setSubmitting(true);
      // Realiza la llamada a la API para enviar la solicitud de plan de entrenamiento
      sendTrainingPlanRequest({
        prompt: prompt,
        weight: weight,
        age: age,
        goal: prompt,
        language: "French",
        trainingDays: trainingDays,
        user: user,
      })
        .then((response) => {
          setResponse(response?.data?.data);
          mutate({ data: [...data.data, response?.data], ...data });
          setShowResults(true);
        })
        .catch((error) => {
          setError(
            "Une erreur s'est produite lors de la récupération des données.",
            error
          );
        })
        .finally(() => {
          setSubmitting(false);
          setPrompt("select an option");
        });
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === "") {
      setPromptTokens(0);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "weight") {
      setWeight(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "goal") {
      setPrompt(value);
    } else if (name === "trainingDays") {
      setTrainingDays(value);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResults(false);
    fetchData();
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">
        {DataMattSport.Title}
      </h1>
      <p>{DataMattSport.SubTitle}</p>
      {!showResults ? (
        <WelcomeSport className="mb-8" />
      ) : (
        <div className="flex justify-center">
          <div className="mb-40 md:mt-8 lg:max-w-xl xl:max-w-2xl">
            <SportCoachResults
              weight={weight}
              age={age}
              goal={prompt}
              trainingDays={trainingDays}
            />
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex sm:flex-wrap border-t-4 justify-evenly fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] "
      >
        <div className="flex gap-2 flex-row items-center">
          <div className="w-full sm:w-1/2 md:w-1/4 my-4">
            <fieldset>
              <InputField
                label={DataMattSport.Weight}
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="text"
                className="w-full"
              />
            </fieldset>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 my-4">
            <fieldset>
              <InputField
                label={DataMattSport.Age}
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
                className="w-full"
              />
            </fieldset>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 my-4">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700"
            >
              {DataMattSport.Goal}
            </label>
            <select
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={handlePromptChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select an option </option>
              <option value="weight loss"> {DataMattSport.WeightLoss} </option>
              <option value="muscle building">
                {" "}
                {DataMattSport.MuscleBuilding}{" "}
              </option>
              <option value="mass"> {DataMattSport.Mass} </option>
              <option value="crossfit"> {DataMattSport.Crossfit} </option>
              <option value="dry"> {DataMattSport.Dry} </option>
            </select>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 my-4">
            <label
              htmlFor="trainingDays"
              className="block text-sm font-medium text-gray-700"
            >
              {DataMattSport.NumberofTrainigns}
            </label>
            <select
              id="trainingDays"
              name="trainingDays"
              value={trainingDays}
              onChange={handleChange}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <button
              type="submit"
              disabled={submitting}
              className="w-6 h-10 items-center justify-center border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-24"
            >
              {submitting
                ? DataMattSport.LoadingButton
                : DataMattSport.GetButton}
            </button>
            <div className="">
              <SportButtonHelper />
            </div>
        </div>
      </form>
      <span className=" flex justify-center items-center text-gray-900 my-2">
        Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
      </span>

      {error && <h4 className="text-red-500 text-center">{error}</h4>}
    </div>
  );
};
