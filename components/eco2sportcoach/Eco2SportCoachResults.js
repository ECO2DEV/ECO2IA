import { useEffect, useState, useReducer } from "react";
import { useSportCoach } from "../../hooks/useSportCoach";
// import {} from "../../public/image_sportcoach"
import { LoadingIndicator } from "./LoadingIndicator";
import ExportPDF from "./ExportPDF";
import dynamic from "next/dynamic";
import ShareModal from "./ShareModal";
import { toast } from "react-hot-toast";
import {
  ShareIcon,
  DocumentArrowDownIcon,
  // DocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

const PDFDownloadLinkDynamic = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);

const exercisesReducer = (state, action) => {
  if (!state[action.dayIndex]?.exercises) {
    return state;
  }
  switch (action.type) {
    case "TOGGLE_EXERCISE":
      return {
        ...state,
        [action.dayIndex]: {
          ...state[action.dayIndex],
          exercises: state[action.dayIndex].exercises.map((completed, index) =>
            index === action.exerciseIndex ? !completed : completed
          ),
        },
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
        "Se ha producido un error al recuperar los datos, por favor, inténtelo de nuevo"
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
            exercises: day.exercises.map(() => false),
          };
        } else {
          return {
            exercises: [],
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
      type: "TOGGLE_EXERCISE",
      dayIndex,
      exerciseIndex,
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
    let content = "¡Hola! Comparto mi plan de entrenamiento :\n\n";
    if (responseObj) {
      responseObj?.resp?.forEach((day) => {
        content += `${day.day}:\n`;
        if (day.exercises) {
          day.exercises.forEach((exercise) => {
            content += `${exercise.name}: ${exercise.description}\n`;
          });
          content += "\n";
        }
      });
    }
    return content;
  };

  const getExerciseImageUrl = (exerciseName) => {
    const imageName =
      exerciseName.toLowerCase().replace(/ /g, "_").replace(/ñ/g, "n") + ".jpg";
    // La ruta comienza con "/", que significa que es relativa a la raíz del dominio
    return `/image_sportcoach/${imageName}`;
  };

  return (
    <div className="relative  mt-4 md:mt-8 lg:max-w-[60rem] xl:max-w-[90rem] mx-auto p-6 bg-cardBackground rounded-lg shadow-md">
      <div className="absolute top-0 left-0 mt-[-30px] ml-4 z-40">
        <div className="flex space-x-2">
          <button
            onClick={handleShareClick}
            className="flex items-center justify-center border-white bg-eco2MainColor hover:bg-eco2HoverColor text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 ease-in-out"
          >
            <ShareIcon className="h-5 w-5 mr-2" />
          </button>

          <PDFDownloadLinkDynamic
            document={
              <ExportPDF
                generateTrainingPlanContent={generateTrainingPlanContent}
              />
            }
            fileName="MARIASPORT.pdf"
          >
            <button className="flex items-center justify-center border-white bg-eco2MainColor hover:bg-eco2HoverColor text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 ease-in-out">
              <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            </button>
          </PDFDownloadLinkDynamic>
        </div>
        {showShareButtons && (
          <ShareModal
            generateTrainingPlanContent={generateTrainingPlanContent}
          />
        )}
      </div>
      {responseObj ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {responseObj?.resp?.map((day, index) => (
            <div
              key={`day-${index}`}
              className="bg-eco2HoverColor dark:bg-darkBgCard rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden
              border-2 dark:border-white border-eco2MainColor"
            >
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{day.day}</h3>
              </div>
              <ol className="list-disc space-y-2 p-4">
                {day?.exercises?.map((exercise, exerciseIndex) => (
                  <li
                    key={`${day.id}-${exerciseIndex}`}
                    className="flex items-center justify-start cursor-pointer"
                    onClick={() => handleExerciseClick(index, exerciseIndex)}
                  >
                    <Image
                      width={100}
                      height={100}
                      src="/image_sportcoach/default.jpeg"
                      alt={exercise.name}
                      // onError={(e) => {
                      //   e.target.onerror = null;
                      //   e.target.src = "/image_sportcoach/default.jpeg";
                      // }}
                      className="exercise-image"
                    />

                    {/* <span
                      className={`ml-4 flex min-w-0 flex-col ${
                        completedExercises[index]?.exercises[exerciseIndex]
                          ? "line-through"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {exercise.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {exercise.description}
                      </span>
                    </span> */}

                    <span className="flex-grow ml-4 text-sm">
                      <span className="font-medium">{exercise.name}</span><br/>
                      <span className="text-gray-500">
                        {exercise.description}
                      </span>
                    </span>

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
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        <div>Intentar de nuevo</div>
      )}
    </div>
  );
};
