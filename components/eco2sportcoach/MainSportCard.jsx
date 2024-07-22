import { useRouter } from 'next/navigation';
import { GiftSport } from './GiftSport';
import { GymIcon } from '../icons/icons';

export const MainSportCard = ({ day, index, user }) => {
  const allExercises = localStorage.getItem('exercises') || null;
  const exercisesParse = JSON.parse(allExercises);

  const router = useRouter();
  function handleExerciseClick(exce) {
    return router.push(`/eco2sport/${exce?.name}?userId=${user}`);
  }

  // console.log("allExercises", allExercises)

  return (
    <div
      key={`day-${index}`}
      className="w-full bg-eco2HoverColor dark:bg-darkBgCard rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden
    border-2 dark:border-white border-eco2MainColor"
    >
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{day.day}</h3>
      </div>
    
      <ol className="list-disc space-y-2 p-4">
        {day?.exercises?.map((exce, exerciseIndex) => {
          // console.log('exce', exce);

          const exerciseExists = exercisesParse?.value?.find(
            (exerciseItem) => exerciseItem.name === exce.name
          );

          if (!exerciseExists) {
            const similarExercises = exercisesParse?.value?.filter(
              (exerciseItem) => exerciseItem.name.includes(exce.name)
            );

            if (similarExercises?.length > 0) {
              // console.log("similar exercises", similarExercises[0].gifUrl)
              return (
                <li
                  key={`${day.id}-${exerciseIndex}`}
                  className="flex hover:scale-105 transition-all duration-200 items-center justify-center cursor-pointer"
                  onClick={() => handleExerciseClick(similarExercises[0])}
                >
                  <GiftSport
                    key={day.id}
                    exceName={day.exercises[exerciseIndex].name}
                    exceGif={similarExercises[0].gifUrl}
                  />

                  <article className="flex-1 ml-4 text-sm">
                    <span className="font-medium">
                      {similarExercises[0].name}
                    </span>
                    <br />
                    <span className="dark:text-gray-500">
                      {exce.description}
                    </span>
                  </article>

                  <footer className="mr-2 flex h-9 items-center">
                  <GymIcon className="h-5 w-5 text-orange-800" />
                  </footer>
                </li>
              );
            } else {
              const randomExercise =
                exercisesParse?.value?.[exerciseIndex];

                // console.log("random exercise", randomExercise.gifUrl)
              return (
                <li
                  key={`${day.id}-${exerciseIndex}`}
                  className="flex hover:scale-105 transition-all duration-200 items-center justify-center cursor-pointer"
                  onClick={() => handleExerciseClick(randomExercise)}
                >
                  <GiftSport
                    key={day.id}
                    exceName={randomExercise?.name}
                    exceGif={randomExercise?.gifUrl}
                  />

                  <article className="flex-1 ml-4 text-sm">
                    <span className="font-medium">{randomExercise?.name}</span>
                    <br />
                    <span className="dark:text-gray-500">
                      {exce.description}
                    </span>
                  </article>

                  <footer className="mr-2 flex h-9 items-center">
                    {' '}
                    <GymIcon className="h-5 w-5 text-orange-800" />
                  </footer>
                </li>
              );
            }
          } else {
            // console.log("exercise exists", exerciseExists.gifUrl)
            return (
              <li
                key={`${day.id}-${exerciseIndex}`}
                className="flex hover:scale-105 transition-all duration-200 items-center justify-center cursor-pointer"
                onClick={() => handleExerciseClick(exce)}
              >
                <GiftSport
                  key={day.id}
                  exceName={day.exercises[exerciseIndex].name}
                  exceGif={exerciseExists.gifUrl}

                />

                <article className="flex-1 ml-4 text-sm">
                  <span className="font-medium">{exerciseExists?.name}</span>
                  <br />
                  <span className="dark:text-gray-500">{exce?.description}</span>
                </article>

                <footer className="mr-2 flex h-9 items-center">
                  <GymIcon className="h-5 w-5 text-orange-800" />
                </footer>
              </li>
            );
          }
        })}
      </ol>
    </div>
  );
};
