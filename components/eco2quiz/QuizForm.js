import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { DataEco2Quiz } from '../../data/eco2quiz';
import Loader from '../loader/loader';

export const QuizForm = ({
  handleSubmit,
  handlePropmtChange,
  loading,
  formState,
  setFormState
}) => {
  const { prompt } = useContext(PromptContext);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <label
        htmlFor="prompt"
        className="block text-sm font-semibold text-eco2MainColor"
      >
        Tema:
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows="10"
        cols="30"
        placeholder={DataEco2Quiz.PromptMain}
        value={prompt ? prompt : ''}
        onChange={handlePropmtChange}
        className="w-full px-4 py-2 border rounded-lg custom-input resize-none text-black mt-1"
      />

      <label
        htmlFor="optionChoice"
        className="block text-sm font-semibold text-eco2MainColor mt-4"
      >
        Seleccione una opción:
      </label>
      <select
        name="optionChoice"
        value={formState.optionChoice}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border custom-input rounded-lg text-black"
      >
        <option value="multipleChoice"> {DataEco2Quiz.MultipleChoise} </option>
        <option value="trueFalse"> {DataEco2Quiz.TrueFalse} </option>
        <option value="ShortAnswer"> {DataEco2Quiz.ShortAnswer} </option>
      </select>

      <label
        htmlFor="language"
        className="block text-sm font-semibold text-eco2MainColor mt-4"
      >
        Idioma:
      </label>
      <select
        id="language"
        name="language"
        value={formState.language}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border custom-input rounded-lg text-black"
      >
        <option value="Auto"> {DataEco2Quiz.Auto} </option>
        <option value="En"> {DataEco2Quiz.English} </option>
        <option value="Es"> {DataEco2Quiz.Spanish} </option>
        <option value="Fr"> {DataEco2Quiz.French} </option>
        <option value="De"> {DataEco2Quiz.Deutsch} </option>
        <option value="It"> {DataEco2Quiz.Italian} </option>
        <option value="Pt"> {DataEco2Quiz.Portuguese} </option>
      </select>

      <label
        htmlFor="difficulty"
        className="block text-sm font-semibold text-eco2MainColor mt-4"
      >
        Dificultad:
      </label>
      <select
        id="difficulty"
        name="difficulty"
        value={formState.difficulty}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border custom-input rounded-lg text-black"
      >
        <option value="easy"> {DataEco2Quiz.Easy} </option>
        <option value="medium"> {DataEco2Quiz.Medium} </option>
        <option value="hard"> {DataEco2Quiz.Hard} </option>
      </select>

      <label
        htmlFor="questionQuantity"
        className="block text-sm font-semibold text-eco2MainColor mt-4"
      >
        Cantidad de preguntas:
      </label>
      <input
        type="number"
        id="questionQuantity"
        name="questionQuantity"
        placeholder={DataEco2Quiz.NumberQuestions}
        value={formState.questionQuantity}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border custom-input rounded-lg text-black"
      />

      <button
        disabled={loading}
        type="submit"
        className={`${
          loading
            ? 'text-white rounded-full text-center focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-eco2MainColor'
            : ' rounded-full  font-semibold bg-eco2MainColor text-white ring-1 ring-inset ring-gray-300'
        } w-full mt-4 px-4 py-2 `}
      >
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          'Enviar'
        )}
      </button>
      {/* 
      <span className="flex justify-center items-center text-eco2MainColor">
        Tokens utilizados para la pregunta : {promptTokens}&nbsp;&nbsp;
      </span> */}
    </form>
  );
};
