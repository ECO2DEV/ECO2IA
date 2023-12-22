import { useContext } from 'react';
import { PromptContext } from '../../context/prompts/PromptContext';
import { DataMattQuiz } from '../../data/mattquiz';
import Loader from '../loader/loader';

export const QuizForm = ({
  handleSubmit,
  handlePropmtChange,
  loading,
  formState,
  setFormState
}) => {
  const { prompt, promptTokens } = useContext(PromptContext);
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
        className="block text-sm font-medium text-gray-700"
      >
        Prompt:
      </label>
      <textarea
        id="prompt"
        name="prompt"
        rows="10"
        cols="30"
        placeholder={DataMattQuiz.PromptMain}
        value={prompt ? prompt : ''}
        onChange={handlePropmtChange}
        className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
      />

      <label
        htmlFor="optionChoice"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Option Choice:
      </label>
      <select
        name="optionChoice"
        value={formState.optionChoice}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="multipleChoice"> {DataMattQuiz.MultipleChoise} </option>
        <option value="trueFalse"> {DataMattQuiz.TrueFalse} </option>
        <option value="ShortAnswer"> {DataMattQuiz.ShortAnswer} </option>
      </select>

      <label
        htmlFor="language"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Language:
      </label>
      <select
        id="language"
        name="language"
        value={formState.language}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Auto"> {DataMattQuiz.Auto} </option>
        <option value="En"> {DataMattQuiz.English} </option>
        <option value="Es"> {DataMattQuiz.Spanish} </option>
        <option value="Fr"> {DataMattQuiz.French} </option>
        <option value="De"> {DataMattQuiz.Deutsch} </option>
        <option value="It"> {DataMattQuiz.Italian} </option>
        <option value="Pt"> {DataMattQuiz.Portuguese} </option>
      </select>

      <label
        htmlFor="difficulty"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Difficulty:
      </label>
      <select
        id="difficulty"
        name="difficulty"
        value={formState.difficulty}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="easy"> {DataMattQuiz.Easy} </option>
        <option value="medium"> {DataMattQuiz.Medium} </option>
        <option value="hard"> {DataMattQuiz.Hard} </option>
      </select>

      <label
        htmlFor="questionQuantity"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Question Quantity:
      </label>
      <input
        type="number"
        id="questionQuantity"
        name="questionQuantity"
        placeholder={DataMattQuiz.NumberQuestions}
        value={formState.questionQuantity}
        onChange={handleChange}
        className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        disabled={loading}
        type="submit"
        className={`${
          loading
            ? 'text-white bg-gray-500 rounded-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500'
            : ' rounded-full  font-semibold bg-indigo-600 text-white ring-1 ring-inset ring-gray-300'
        } w-full mt-4 px-4 py-2 `}
      >
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          'Envoyer'
        )}
      </button>

      <span className="flex justify-center items-center text-gray-900 my-2">
        Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
      </span>
    </form>
  );
};