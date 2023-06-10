import { useState, useContext } from 'react';
import { MatquizResponse } from '../../util/api/matquizResponse';
import { UserContext } from '../../context/user/UserContext';
import Loader from '../loader/loader';
import { MatquizSkeleton } from './MatquizSkeleton';

export const MatquizAI = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    topic: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Make form validation

    if (formState.questionQuantity < 1 || formState.questionQuantity > 10) {
      setError('Please type a number between 1 and 15');
      alert('Please type a number between 1 and 15');
      return;
    }
    console.log('formState.topic is:', formState.topic);
    if (formState.topic === '') {
      setError('Please type a topic');
      alert('Please type a topic');
      return;
    }
    // Make a topic limit of 1000 characters
    if (formState.topic.length > 1000) {
      setError('Please type a topic with less than 1000 characters');
      alert('Please type a topic with less than 1000 characters');
      return;
    }
    setIsLoading(true);
    // Make API call
    MatquizResponse({
      topic: formState.topic,
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
      })
      .catch((error) => {
        console.log('error is:', error);
        setError('An error occurred while fetching data.');
      })
      .finally(() => {
        setIsLoading(false);
        setFormState({
          topic: '',
          optionChoice: 'multipleChoice',
          language: 'Auto',
          difficulty: 'easy',
          questionQuantity: 0
        });
      });
  };

  return (
    <section className="flex flex-col sm:flex-row justify-center items-center py-10 gap-2">
      <div className="w-full max-w-md mx-4">
        <form onSubmit={handleSubmit}>
          <textarea
            id="topic"
            name="topic"
            rows="10"
            cols="30"
            placeholder="Generate questions based on a topic, for example: math, history, science, digital marrketing."
            value={formState.topic}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <select
            name="optionChoice"
            value={formState.optionChoice}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="multipleChoice">Multiple Choice</option>
            <option value="trueFalse">True or False</option>
            <option value="ShortAnswer">Short Answer</option>
          </select>

          <select
            id="language"
            name="language"
            value={formState.language}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Auto">Auto</option>
            <option value="En">English</option>
            <option value="Es">Spanish</option>
            <option value="Fr">French</option>
            <option value="De">German</option>
            <option value="It">Italian</option>
            <option value="Pt">Portuguese</option>
          </select>

          <select
            id="difficulty"
            name="difficulty"
            value={formState.difficulty}
            onChange={handleChange}
            className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
            // help me with some class for disable bottom
            className={`${
              loading
                ? 'text-white bg-gray-500 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500'
                : 'text-white bg-blue-500 rounded-lg hover:bg-blue-600 text-center focus:outline-none focus:ring-2 focus:ring-blue-500'
            } w-full mt-4 px-4 py-2 `}
          >
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              'Submit'
            )}
          </button>
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
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                Generated Questions
              </h3>
              <ul className="flex flex-col justify-center items-center">
                {submittedData.resp.map(
                  ({ question, posibleAnswers, correctAnswer }, index) => (
                    <li key={index}>
                      <details
                        open
                        className="mb-1 border border-gray-300 rounded p-4"
                      >
                        <summary className="text-lg font-bold text-blue-500 cursor-pointer transition-colors duration-300 hover:text-blue-800">
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
                                <p className="text-lg font-semibold text-gray-800">
                                  {posibleAnswer}
                                </p>
                              )}

                              {posibleAnswer === correctAnswer && (
                                <p className="flex justify-center ml-2 text-green-500 text-center items-center">
                                  Correct Answer
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </details>
                    </li>
                  )
                )}
              </ul>
            </div>
          )
        )}
      </div>
    </section>
  );
};
