import React, { useContext, useState, useEffect, useReducer } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";
import { LoadingIndicator } from "./LoadingIndicator";
import ExportPDF from "./ExportPDF";
import dynamic from "next/dynamic";

const PDFDownloadLinkDynamic = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);
import { FacebookIconSVG, WhatsAppIconSVG, EmailIconSVG } from "../icons/icons";
import {
  ShareIcon,
  DocumentArrowDownIcon,
  // DocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";

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

export const SportCoachResults = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading, error } = useSportCoach(user?.id);
  const response = data?.data[0]?.attributes?.payload_out?.resp;
  const responseObj = JSON.parse(response) || [];

  // Estado para controlar el índice del día activo
  const [activeIndex, setActiveIndex] = useState(0);
  // Estado para mostrar u ocultar los botones de compartir
  const [showShareButtons, setShowShareButtons] = useState(false);
  // Estado para realizar un seguimiento de los ejercicios completados
  const initialState = responseObj?.resp?.map((day) => {
    if (day.exercises) {
      return {
        exercises: new Array(day.exercises.length).fill(false),
      };
    } else {
      return {
        exercises: [],
      };
    }
  });

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
    let content = "Salut! Je partage mon plan d'entraînement :\n\n";
    responseObj.resp.forEach((day) => {
      content += `${day.day}:\n`;
      if (day.exercises) {
        day.exercises.forEach((exercise) => {
          content += `${exercise.name}: ${exercise.description}\n`;
        });
        // Genera el contenido del plan de entrenamiento en un formato específico
        content += "\n";
      }
    });
    return content;
  };

  return (
    <div className="p-6 min-h-[60rem]">
      {responseObj.resp.map((day, index) => (
        <div
          key={`day-${index}`}
          className="border p-4 cursor-pointer w-96 grid"
          onClick={() => setActiveIndex(index)}
        >
          <h3 className="text-lg font-bold mb-2">{day.day}</h3>
          <ol
            className={`${
              activeIndex !== index ? "hidden" : ""
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
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  ) : (
                    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
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
      ))}

      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex justify-evenly w-96 space-x-4 rounded-md bg-gray-50 shadow absolute"
        >
          <li className="flex items-center w-auto text-gray-500">
            <button
              onClick={handleShareClick}
              className="flex items-center p-2 rounded-md hover:bg-gray-100"
            >
              <ShareIcon className="w-5 h-5 mr-1" /> Partager
            </button>
          </li>
          {/* <li className="flex space-x-4 items-center w-auto text-gray-500 hover:text-gray-500">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button className="flex items-center p-2 rounded-md hover:bg-gray-100">
              <DocumentIcon className="w-5 h-5 mr-1" /> Word
            </button>
          </li> */}
          <PDFDownloadLinkDynamic
            document={
              <ExportPDF
                generateTrainingPlanContent={generateTrainingPlanContent}
              />
            }
            fileName="SportCoach.pdf"
          >
            <li className="flex space-x-4 items-center w-auto text-gray-500 hover:text-gray-500">
              <svg
                className="h-full text-xs w-5 flex-shrink-0 text-gray-400"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <button className="flex items-center p-2 rounded-md hover:bg-gray-100">
                <DocumentArrowDownIcon className="w-5 h-5 mr-1" /> Pdf
              </button>
            </li>
          </PDFDownloadLinkDynamic>
        </ol>
      </nav>

      {showShareButtons && (
        <div className="relative w-10 h-fit bottom-[6rem] left-14 gap-2 z-10 flex flex-col items-center bg-gray-100 shadow">
          <FacebookShareButton
            className="h-4 w-4"
            url={"https://next-mattech.vercel.app"}
            title={generateTrainingPlanContent()}
            quote={generateTrainingPlanContent()}
            hashtag={"#SportCoach"}
          >
            <FacebookIconSVG />
          </FacebookShareButton>
          <WhatsappShareButton
            url={"https://next-mattech.vercel.app"}
            title={generateTrainingPlanContent()}
          >
            <WhatsAppIconSVG />
          </WhatsappShareButton>
          <EmailShareButton
            url={"https://next-mattech.vercel.app"}
            subject="plan de formation"
            body={generateTrainingPlanContent()}
          >
            <EmailIconSVG className='w-6' />
          </EmailShareButton>
        </div>
      )}
    </div>
  );
};
