import { useState, useContext } from 'react';
import { MatquizResponse } from '../../util/api/matquizResponse';
import { UserContext } from '../../context/user/UserContext';
import { PromptContext } from '../../context/prompts/PromptContext';
import Loader from '../loader/loader';
import { MatquizSkeleton } from './MatquizSkeleton';
import { ClipboardIcon, ShowAnswerIcon } from '../icons/icons';
import { toast } from 'react-hot-toast';

export const MatquizAI = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const { user } = useContext(UserContext);
  const { setPrompt, prompt, setResponse, setPromptTokens, promptTokens } =
    useContext(PromptContext);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    optionChoice: 'multipleChoice',
    language: 'Auto',
    difficulty: 'easy',
    questionQuantity: 0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePropmtChange = (event) => {
    const { value } = event.target;
    if (value === '') {
      setPromptTokens(0);
    }
    setPrompt(value);
  };
  const handleCopy = () => {
    navigator.clipboard
      // if isAnswerVisible is true, copy the questions with the answers, if is false, copy only the questions
      .writeText(
        isAnswerVisible
          ? JSON.stringify(submittedData)
          : JSON.stringify(
              submittedData.resp.map(({ question }) => ({ question }))
            )
      )
      .then(() => {
        toast.success('Text copied to clipboard!');
      })
      .catch((error) => {
        toast.error('Failed to copy text to clipboard!');
        console.error('Error al copiar al portapapeles:', error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make form validation

    console.log('formState.topic is:', prompt);
    if (prompt === '') {
      setError('Veuillez saisir un sujet');
      toast.error('Veuillez saisir un sujet');
      return;
    }
    if (formState.questionQuantity < 1 || formState.questionQuantity > 10) {
      setError('Veuillez saisir un nombre entre 1 et 10');
      toast.error('Veuillez saisir un nombre entre 1 et 10');
      return;
    }
    // Make a topic limit of 1000 characters
    if (prompt == null || prompt.length > 1000) {
      setError('Veuillez saisir un sujet contenant moins de 1000 caractères');
      toast.error(
        'Veuillez saisir un sujet contenant moins de 1000 caractères'
      );
      return;
    }
    setIsLoading(true);
    // Make API call
    MatquizResponse({
      topic: prompt,
      language: formState.language,
      difficulty: formState.difficulty,
      optionChoice: formState.optionChoice,
      questionQuantity: formState.questionQuantity,
      user: user
    })
      .then((response) => {
        console.log('response is:');
        console.log(response?.data?.data);
        setSubmittedData(response?.data?.data);
        setResponse(response?.data?.data);
      })
      .catch((error) => {
        console.log('error is:', error);
        setError('An error occurred while fetching data.');
      })
      .finally(() => {
        setIsLoading(false);
        setFormState({
          optionChoice: 'multipleChoice',
          language: 'Auto',
          difficulty: 'easy',
          questionQuantity: 0
        });
        setPrompt('');
      });
  };

  return (
    <section className="flex flex-col sm:flex-row justify-center items-center py-10 gap-2">
      <div className="w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <textarea
            id="prompt"
            name="prompt"
            rows="10"
            cols="30"
            placeholder="Générer des questions de quiz basées sur un sujet, par exemple : mathématiques, histoire, science, marketing digital."
            value={prompt ? prompt : ''}
            onChange={handlePropmtChange}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="optionChoice"
            value={formState.optionChoice}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="multipleChoice">Choix multiple</option>
            <option value="trueFalse">Vrai ou faux</option>
            <option value="ShortAnswer">Réponse courte</option>
          </select>

          <select
            id="language"
            name="language"
            value={formState.language}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Auto">Auto</option>
            <option value="En">Anglais</option>
            <option value="Es">Espagnol</option>
            <option value="Fr">Français</option>
            <option value="De">Allemand</option>
            <option value="It">Italien</option>
            <option value="Pt">Portugais</option>
          </select>

          <select
            id="difficulty"
            name="difficulty"
            value={formState.difficulty}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Facile</option>
            <option value="medium">Moyen</option>
            <option value="hard">Difficile</option>
          </select>

          <input
            type="number"
            id="questionQuantity"
            name="questionQuantity"
            placeholder="Number of questions you want"
            value={formState.questionQuantity}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              'Soumettre'
            )}
          </button>
          <span className=" flex justify-center items-center text-gray-900 my-2">
            Points utilisés pour la question : {promptTokens}&nbsp;&nbsp;
          </span>
        </form>
      </div>

      <div className="w-full max-w-md mx-4">
        {loading ? (
          // Skeleton with tailwind
          <div className="flex flex-col gap-2">
            {Array.from({ length: formState.questionQuantity }, (_, index) => (
              <MatquizSkeleton key={index} />
            ))}
          </div>
        ) : (
          submittedData && (
            <div className="relative flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Questions Générées
              </h3>
              <ul className="flex flex-col justify-center items-start">
                {submittedData.resp.map(
                  ({ question, posibleAnswers, correctAnswer }, index) => (
                    <li key={index}>
                      <details open className="mb-1 p-4  ">
                        <summary className="text-lg font-bold text-indigo-600 cursor-pointer transition-colors duration-300 hover:text-indigo-700">
                          {question}
                        </summary>
                        <div className="flex flex-col justify-center">
                          {posibleAnswers.map((posibleAnswer, index) => (
                            <div
                              key={index}
                              className="flex flex-row justify-start"
                            >
                              {posibleAnswer === 'NA' ? (
                                <p className="flex justify-center ml-2 text-green-500 text-center items-center">
                                  {correctAnswer}
                                </p>
                              ) : (
                                <p className="text-lg font-normal text-gray-800">
                                  {posibleAnswer}
                                </p>
                              )}

                              {posibleAnswer === correctAnswer &&
                              isAnswerVisible ? (
                                <p className="flex font-mediumjustify-center ml-2 text-green-500 text-center items-center">
                                  Réponse Correcte
                                </p>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </details>
                    </li>
                  )
                )}
              </ul>
              <div className="absolute -bottom-5 right-10 flex justify-between items-center gap-2">
                <button
                  onClick={() => setIsAnswerVisible((prevState) => !prevState)}
                >
                  <ShowAnswerIcon />
                </button>
                <button onClick={handleCopy}>
                  <ClipboardIcon />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};
