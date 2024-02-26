import { useEffect, useState, useReducer } from 'react';
import { useSportCoach } from '../../hooks/useSportCoach';
import { LoadingIndicator } from './LoadingIndicator';
import ExportPDF from './ExportPDF';
import dynamic from 'next/dynamic';
import ShareModal from './ShareModal';
import { toast } from 'react-hot-toast';
import {
  ShareIcon,
  DocumentArrowDownIcon,
  // DocumentIcon,
  CheckIcon
} from '@heroicons/react/24/solid';

const PDFDownloadLinkDynamic = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false
  }
);

const exercisesReducer = (state, action) => {
  if (!state[action.dayIndex]?.exercises) {
    return state;
  }
  switch (action.type) {
    case 'TOGGLE_EXERCISE':
      return {
        ...state,
        [action.dayIndex]: {
          ...state[action.dayIndex],
          exercises: state[action.dayIndex].exercises.map((completed, index) =>
            index === action.exerciseIndex ? !completed : completed
          )
        }
      };

    default:
      return state;
  }
};

export const SportCoachResults = ({ user }) => {
  // const { user } = useContext(UserContext);
  const { data, isLoading, error } = useSportCoach(user);
  const [responseObj, setResponseObj] = useState(null);
  // console.log('the data', data);
  useEffect(() => {
    if (!data || data?.data[0]?.attributes?.payload_out === undefined) {
      toast.error(
        'Se ha producido un error al recuperar los datos, por favor, inténtelo de nuevo'
      );
      return;
    }
    // console.log('el response es: ', data?.data[0]?.attributes?.payload_out);
    const response = data?.data[0]?.attributes?.payload_out || [];
    const parsedResponse = JSON.parse(response.resp);
    // console.log('respuesta ya parseada: ', parsedResponse);
    setResponseObj(parsedResponse);
  }, [data]);

  // Estado para controlar el índice del día activo
  const [activeIndex, setActiveIndex] = useState(0);
  // Estado para mostrar u ocultar los botones de compartir
  const [showShareButtons, setShowShareButtons] = useState(false);
  // Estado para realizar un seguimiento de los ejercicios completados
  const initialState = responseObj?.resp
    ? responseObj.resp.map((day) => {
        if (day.exercises) {
          return {
            exercises: day.exercises.map(() => false)
          };
        } else {
          return {
            exercises: []
          };
        }
      })
    : [];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const [completedExercises, dispatch] = useReducer(
    exercisesReducer,
    initialState
  );

  // Maneja el clic en un ejercicio para marcarlo como completado
  const handleExerciseClick = (dayIndex, exerciseIndex) => {
    dispatch({
      type: 'TOGGLE_EXERCISE',
      dayIndex,
      exerciseIndex
    });
  };

  // Maneja el clic en el botón de compartir
  const handleShareClick = () => {
    setShowShareButtons(!showShareButtons);
  };

  if (isLoading) {
    // Mostrar un indicador de carga si los datos están siendo cargados
    return <LoadingIndicator />;
  }

  // formato para compartir el plan de entrenamiento a pdf y a las redes sociales
  const generateTrainingPlanContent = () => {
    let content = '¡Hola! Comparto mi plan de entrenamiento :\n\n';
    if (responseObj) {
      // console.log('the response obj', typeof responseObj);
      responseObj?.resp?.forEach((day) => {
        content += `${day.day}:\n`;
        if (day.exercises) {
          day.exercises.forEach((exercise) => {
            content += `${exercise.name}: ${exercise.description}\n`;
          });
          // Genera el contenido del plan de entrenamiento en un formato específico
          content += '\n';
        }
      });
    }
    return content;
  };

  return (
    <div className="p-6 min-h-[60rem]">
      {responseObj ? (
        responseObj?.resp?.map((day, index) => (
          <div
            key={`day-${index}`}
            className="border p-4 cursor-pointer w-96 grid"
            onClick={() => setActiveIndex(index)}
          >
            <h3 className="text-lg font-bold mb-2">{day.day}</h3>
            <ol
              className={`${
                activeIndex !== index ? 'hidden' : ''
              } ml-4 whitespace-normal`}
            >
              {day?.exercises?.map((exercise, exerciseIndex) => (
                <li
                  key={`${day.id}-${exerciseIndex}`}
                  className="flex items-center"
                  onClick={() => handleExerciseClick(index, exerciseIndex)}
                >
                  <span className="flex h-9 items-center">
                    {completedExercises[index]?.exercises[exerciseIndex] ? (
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <CheckIcon
                          className="h-5 w-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    ) : (
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                      </span>
                    )}
                  </span>
                  <span className="ml-4 flex min-w-0 flex-col">
                    <span className="text-sm font-medium">{exercise.name}</span>
                    <span className="text-sm text-gray-500">
                      {exercise.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ))
      ) : (
        <div>Intentar de nuevo</div>
      )}

      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex justify-evenly w-96 space-x-4 rounded-md bg-eco2MainColor shadow absolute"
        >
          <li className="flex items-center w-auto text-white">
            <button
              onClick={handleShareClick}
              className="flex items-center p-2 rounded-md hover:bg-eco2HoverColor"
            >
              <ShareIcon className="w-5 h-5 mr-1" /> Compartir
            </button>
          </li>

          <PDFDownloadLinkDynamic
            document={
              <ExportPDF
                generateTrainingPlanContent={generateTrainingPlanContent}
              />
            }
            fileName="MATTSPORT.pdf"
          >
            <li className="flex space-x-4 items-center w-auto text-white">
              <svg
                className="h-full text-xs w-5 flex-shrink-0 text-white"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <button className="flex items-center p-2 rounded-md">
                <DocumentArrowDownIcon className="w-5 h-5 mr-1" /> PDF
              </button>
            </li>
          </PDFDownloadLinkDynamic>
        </ol>
      </nav>

      {showShareButtons && (
        <ShareModal generateTrainingPlanContent={generateTrainingPlanContent} />
      )}
    </div>
  );
};
