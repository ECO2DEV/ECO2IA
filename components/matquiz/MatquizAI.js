import { useState, useContext, useEffect } from 'react';
import { MatquizResponse } from '../../util/api/matquizResponse';
import { UserContext } from '../../context/user/UserContext';
import { PromptContext } from '../../context/prompts/PromptContext';
import { MatquizSkeleton } from './MatquizSkeleton';
import { ClipboardIcon, ShowAnswerIcon } from '../icons/icons';
import { toast } from 'react-hot-toast';
import { DataMattQuiz } from '../../data/mattquiz';
import { QuizForm } from './QuizForm';

export const MatquizAI = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const { user } = useContext(UserContext);
  const {
    setPrompt,
    prompt,
    setResponse,
    activeAI,
    setActiveAI,
    setPromptTokens
  } = useContext(PromptContext);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    optionChoice: 'multipleChoice',
    language: 'Auto',
    difficulty: 'easy',
    questionQuantity: 0
  });

  useEffect(() => {
    if (activeAI !== 'MatquizAI') {
      setPrompt('');
      setPromptTokens(0);
    }
    setActiveAI('MatquizAI');
  }, []);

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
        toast.success(DataMattQuiz.CopiedSuccess);
      })
      .catch((error) => {
        toast.error(DataMattQuiz.CopiedFailed);
        console.error('Error al copiar al portapapeles:', error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make form validation

    // console.log('formState.topic is:', prompt);
    if (prompt === '') {
      setError(DataMattQuiz.ProvideTopic);
      toast.error(DataMattQuiz.ProvideTopic);
      return;
    }
    if (formState.questionQuantity < 1 || formState.questionQuantity > 10) {
      setError(DataMattQuiz.ProvideNumber);
      toast.error(DataMattQuiz.ProvideNumber);
      return;
    }
    // Make a topic limit of 1000 characters
    if (prompt == null || prompt.length > 1000) {
      setError(DataMattQuiz.ProvideSubject);
      toast.error(DataMattQuiz.ProvideSubject);
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
        // console.log('response is:');
        // console.log(response?.data?.data);
        setSubmittedData(response?.data?.data);
        setResponse(response?.data?.data);
      })
      .catch((error) => {
        // console.log('error is:', error);
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
        <QuizForm
          handleSubmit={handleSubmit}
          handlePropmtChange={handlePropmtChange}
          loading={loading}
          formState={formState}
          setFormState={setFormState}
        />
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
            <section className="relative flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {DataMattQuiz.QuestionGenerated}
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
                                  {DataMattQuiz.CorrectAnswer}
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
            </section>
          )
        )}
      </div>
    </section>
  );
};
