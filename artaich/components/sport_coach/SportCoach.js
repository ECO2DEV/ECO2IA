import { useContext, useState } from "react";
import { InputField } from "./InputField";
import { PromptContext } from "../../context/prompts/PromptContext";
import { sendTrainingPlanRequest } from "../../util/api/sendTrainingPlanRequest";
import { SportCoachResults } from "./SportCoachResults";
import { useSportCoach } from "../../hooks/useSportCoach";

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
          setError("Une erreur s'est produite lors de la récupération des données.", error);
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
    <div className="flex flex-col items-center w-fullmin-h-screen mt-12">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Sport Coach
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
        Bénéficiez d'un plan de formation personnalisé
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <fieldset className="w-full md:w-1/2">
              <InputField
                label="Weight"
                name="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="text"
              />
              <InputField
                label="Age"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="text"
              />
            </fieldset>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="goal"
                className="block text-sm font-medium text-gray-700"
              >
                goal
              </label>
              <select
                id="goal"
                name="goal"
                value={goal}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="weight loss">weight loss</option>
                <option value="muscle building">muscle building</option>
                <option value="mass">mass</option>
                <option value="crossfit">crossfit</option>
                <option value="dry">dry</option>
              </select>
              <label
                htmlFor="trainingDays"
                className="block text-sm font-medium text-gray-700"
              >
                number of training per week
              </label>
              <select
                id="trainingDays"
                name="trainingDays"
                value={trainingDays}
                onChange={handleChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">1 day</option>
                <option value="2">2 days</option>
                <option value="3">3 days</option>
                <option value="4">4 days</option>
                <option value="5">5 days</option>
                <option value="6">6 days</option>
                <option value="7">7 days</option>
              </select>
            </div>
          </div>
          <div className="flex mt-4 justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {submitting ? "loading..." : "Get training plan"}
            </button>
          </div>
        </form>
      </div>

      {showResults && (
        <div className="flex flex-wrap w-full max-w-xl1 rounded-lg p-8 mt-8">
          <SportCoachResults
            weight={weight}
            age={age}
            goal={goal}
            trainingDays={trainingDays}
          />
        </div>
      )}

      {error && <h4 className="text-red-500 text-center">{error}</h4>}
    </div>
  );
};
