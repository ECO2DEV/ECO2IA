import { useContext, useState } from "react";
import { InputField } from "./InputField";
import { PromptContext } from "../../context/prompts/PromptContext";
import { sendTrainingPlanRequest } from "../../util/api/sendTrainingPlanRequest";
import { SportCoachResults } from "./SportCoachResults";
import { useSportCoach } from "../../hooks/useSportCoach";
import { WelcomeSport } from "./welcomesport";
export const SportCoachIA = (props) => {
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
    <div className="flex flex-col items-center w-fullmin-h-screen mt-0">
     {!showResults && <WelcomeSport className="mb-8" />}
    <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4 w-full">
  <div className="col-span-1">
    <fieldset className="my-10">
      <InputField
        label="Poids"
        name="weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        type="text"
      />
    </fieldset>
  </div>
  <div className="col-span-1">
    <fieldset className="my-10">
      <InputField
        label="Âge"
        name="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        type="text"
      />
    </fieldset>
  </div>
  <div className="col-span-1 my-10">
    <label htmlFor="goal" className="block text-sm font-medium text-gray-700 ">
    Objectif
    </label>
    <select
      id="goal"
      name="goal"
      value={goal}
      onChange={handleChange}
      className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="weight loss">Perte de poids</option>
      <option value="muscle building">Renforcement musculaire</option>
      <option value="mass">Prise de masse</option>
      <option value="crossfit">Crossfit</option>
      <option value="dry">Sèche</option>
    </select>
  </div>
  <div className="col-span-1 my-10">
    <label htmlFor="trainingDays" className="block text-sm font-medium text-gray-700">
      Nombre d'entraînements par semaine
    </label>
    <select
      id="trainingDays"
      name="trainingDays"
      value={trainingDays}
      onChange={handleChange}
      className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="1">1 jour</option>
      <option value="2">2 jours</option>
      <option value="3">3 jours</option>
      <option value="4">4 jours</option>
      <option value="5">5 jours</option>
      <option value="6">6 jours</option>
      <option value="7">7 jours</option>
    </select>
  </div>
  <div className="col-span-4 flex mt-0 justify-center">
    <button
      type="submit"
      disabled={submitting}
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {submitting ? "Chargement..." : "Obtenir un plan d'entraînement"}
    </button>
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
