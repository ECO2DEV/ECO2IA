import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../constants/constans';
import { GymIcon, MealIcons } from '../icons/icons';
import { useLocalStorageWithExpiration } from '../../hooks/useLocalStorageWithExpiration';
import { DescriptionExercise } from './DescriptionExercise';
import RecommendMeals from './RecommendMeals';

export default function ExerciseDetailCard({ exercises, slug, userId }) {
  const [exerciseToShow, setExerciseToShow] = useState(null);

  useEffect(() => {
    if (Array.isArray(exercises) && exercises.length > 0) {
      // If exercises is an array, pick the first one as a fallback
      setExerciseToShow(exercises[0]);
    } else if (!Array.isArray(exercises) && exercises) {
      // If exercises is a single object
      setExerciseToShow(exercises);
    } else {
      // If exercises is empty or invalid
      setExerciseToShow(null);
    }
  }, [exercises]);





  // const [storedValue] = useLocalStorageWithExpiration({
  //   key: 'meals',
  //   initialValue: null
  // });

  // console.log('storedValue', storedValue);

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        {/* Image gallery */}
        <div className="flex flex-col-reverse">
          <div className="w-full aspect-video">
            {exerciseToShow ? (
              <img
                src={exerciseToShow.gifUrl}
                alt={exerciseToShow.name}
                className="h-[30rem] w-full object-cover object-center sm:rounded-lg"
              />
            ) : (
              <div className="h-[30rem] w-full bg-gray-200 flex items-center justify-center sm:rounded-lg">
                <span className="text-gray-500">No exercise selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Exercise info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 uppercase">
            {exerciseToShow ? exerciseToShow.name : 'No exercise selected'}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Exercise information</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-gray-100">
              {exerciseToShow ? exerciseToShow.target : ''}
            </p>
          </div>

         <DescriptionExercise slug={slug} userId={userId} />

          <section aria-labelledby="details-heading" className="mt-12">
            <h2 id="details-heading" className="sr-only">
              Additional details
            </h2>

            <div className="divide-y divide-gray-900 dark:divide-gray-200 border-t">
              {/* Meals parts*/}
             <RecommendMeals userId={userId} slug={slug} />
              {/* instructions parts*/}
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <h3>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span
                          className={classNames(
                            open
                              ? 'text-gray-900 dark:text-white'
                              : 'text-gray-900 dark:text-white',
                            'text-sm font-medium'
                          )}
                        >
                          Instructions
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon
                              className="block h-6 w-6 text-gray-800 group-hover:text-gray-800 dark:text-gray-200 group-hover:text-gray-100"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusIcon
                              className="block h-6 w-6 text-gray-900 dark:text-gray-100 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                      <ul role="list">
                        {exerciseToShow && exerciseToShow.instructions ? (
                          exerciseToShow.instructions.map((item, index) => (
                            <li key={index} className="flex items-center">
                              <span className="flex-shrink-0">
                                <GymIcon
                                  className="h-5 w-5 text-gray-900 dark:text-gray-100"
                                  aria-hidden="true"
                                />
                              </span>
                              <p className="ml-3 text-sm text-gray-900 dark:text-gray-100">
                                {item}
                              </p>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-center">
                            <span className="ml-3 text-sm text-gray-500">
                              No instructions available
                            </span>
                          </li>
                        )}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
