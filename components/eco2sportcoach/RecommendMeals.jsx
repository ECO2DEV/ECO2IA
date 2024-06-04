import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../constants/constans';
import { ChatgptResForSportMeals } from '../../util/api/chatgptResponse';
import { MealIcons } from '../icons/icons';
import MealSkeleton from './MealSkeleton';

const RecommendMeals = ({userId, slug}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);


  let refinePrompt = `Recomiéndame comidas saludables basados en el ejercicio ${slug} y este debe ser un array llamado meals.
   No expliques, y evita adicionar algo más, puesto que solo quiero el json, ejemplo correcto:
  "meals":[
    {"meal": "Desayuno", "recommendation": "Avena con frutas"},
    {"meal": "Almuerzo", "recommendation": "Pollo a la plancha con quinoa y vegetales"},
    {"meal": "Cena", "recommendation": "Salmón al horno con espárragos"},
    {"meal": "Snack", "recommendation": "Yogur griego con nueces"}
  ]
  `;

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await ChatgptResForSportMeals({
            prompt: refinePrompt,
            user: userId
          });

          const parseData = JSON.parse(resp.data.message);

          setData(parseData);
        } catch (error) {
          console.error('Error creating meals:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }

  }, [slug]);

  return (
    <Disclosure as="article">
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
                Comidas
              </span>
              <span className="ml-6 flex items-center">
                {open ? (
                  <MinusIcon
                    className="block h-6 w-6 text-gray-800 group-hover:text-gray-800 dark:text-gray-200 group-hover:text-gray-100"
                    aria-hidden="true"
                  />
                ) : (
                  <PlusIcon
                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel as="article" className="prose prose-sm pb-6">
            <ul role="list">
              {isLoading ? (
                <MealSkeleton />
              ) : (
                data?.meals?.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="flex-shrink-0">
                      <MealIcons className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    </span>
                    <p className="ml-3 text-sm text-gray-900 dark:text-gray-100">
                      {item.recommendation}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default RecommendMeals;
