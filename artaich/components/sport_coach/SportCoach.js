import { useContext, useState } from "react";
import { InputField } from "./InputField";
import { PromptContext } from "../../context/prompts/PromptContext";
import { sendTrainingPlanRequest } from "../../util/api/sendTrainingPlanRequest";
import { SportCoachResults } from "./SportCoachResults";
import { useSportCoach } from "../../hooks/useSportCoach";
import { WelcomeSport } from "./welcomesport";
import { SportButtonHelper } from "./SportCoach_Helper";
import { DataMatSport } from "../../data/mattsport";
export const SportCoachIA = (props) => {
  const [openHelpers, setOpenHelpers] = useState(false);
  // Estados para almacenar los datos del formulario
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [trainingDays, setTrainingDays] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  // Obtener el usuario de las props
  const user = props.user;

  // Obtener los datos del entrenador deportivo personalizado
  const { data, mutate } = useSportCoach(user);
  // Obtener los datos y funciones del contexto de prompts
  const { prompt, setPrompt, setResponse, setPromptTokens } =
    useContext(PromptContext);

  // Función para enviar la solicitud de plan de entrenamiento
  const fetchData = async () => {
    if (!prompt) {
      setError("Veuillez taper quelque chose avant de soumettre");
    } else {
      setSubmitting(true);
      // Realiza la llamada a la API para enviar la solicitud de plan de entrenamiento
      sendTrainingPlanRequest({
        prompt: prompt,
        weight: weight,
        age: age,
        goal: goal,
        language: "French",
        trainingDays: trainingDays,
        user: user,
      })
        .then((response) => {
          setResponse(response?.data?.data);
          mutate({ data: [...data.data, response?.data], ...data });
          setShowResults(true); // Mostrar los resultados generados
        })
        .catch((error) => {
          setError(
            "Une erreur s'est produite lors de la récupération des données.",
            error
          );
        })
        .finally(() => {
          setSubmitting(false);
          setPrompt("");
        });
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setPrompt(e.target.value);
    if (e.target.value === "") {
      setPromptTokens(0);
    }
    const { name, value } = e.target;
    if (name === "weight") {
      setWeight(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "goal") {
      setGoal(value);
    } else if (name === "trainingDays") {
      setTrainingDays(value);
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResults(false); // Ocultar los resultados generados
    fetchData();
  };

  return (
      <div className="flex flex-col items-center">
        {!showResults && <WelcomeSport className="" />}
        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-7 justify-center fixed bottom-3 w-[92%] lg:w-[72.5%] xl:w-[77%] 2xl:max-w-[77rem]">
          <div className="col-span-1 flex justify-center">
            <fieldset className="my-10">
              <InputField
                label={DataMatSport.Weight}
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </fieldset>
          </div>
          <div className="col-span-1 flex justify-center">
            <fieldset className="my-10">
              <InputField
                label={DataMatSport.Age}
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </fieldset>
          </div>
          <div className="col-span-1 flex flex-col items-center my-10">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1 text-left">
              {DataMatSport.Goal}
            </label>
            <div className="relative">
              <select
                id="goal"
                name="goal"
                value={goal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="weight loss"> {DataMatSport.WeightLoss} </option>
                <option value="muscle building"> {DataMatSport.MuscleBuilding} </option>
                <option value="mass"> {DataMatSport.Mass} </option>
                <option value="crossfit"> {DataMatSport.Crossfit} </option>
                <option value="dry"> {DataMatSport.Dry} </option>
              </select>
            </div>
          </div>
          <div className="col-span-2 my-10">
            <label htmlFor="trainingDays" className="block text-sm font-medium text-gray-700 mb-1">
              {DataMatSport.NumberofTrainigns}
            </label>
            <div className="relative">
              <select
                id="trainingDays"
                name="trainingDays"
                value={trainingDays}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1"> {DataMatSport.OneDay} </option>
                <option value="2"> {DataMatSport.TwoDays} </option>
                <option value="3">{DataMatSport.ThreeDays}</option>
                <option value="4">{DataMatSport.FourDays}</option>
                <option value="5">{DataMatSport.FiveDays}</option>
                <option value="6">{DataMatSport.SixDays}</option>
                <option value="7">{DataMatSport.SevenDays}</option>
              </select>
            </div>
          </div>
          <div className="col-span-1 my-10">
  <div className="flex items-center">
    <button
      type="submit"
      disabled={submitting}
      className="w-full p-2 border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
    >
      {submitting ? (DataMatSport.LoadingButton) : (DataMatSport.GetButton)}
    </button>
    <SportButtonHelper onClick={() => setOpenHelpers(!openHelpers)} />
  </div>
</div>
        </form>
            {showResults && (
        <div className="flex justify-center">
          <div className="p-4 sm:p-8 md:mt-8 lg:max-w-xl xl:max-w-2xl">
            <SportCoachResults
              weight={weight}
              age={age}
              goal={goal}
              trainingDays={trainingDays}
            />
          </div>
        </div>
      )}
      {error && <h4 className="text-red-500 text-center">{error}</h4>}
    </div>
  );
};
