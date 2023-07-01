import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";
import { LoadingIndicator } from "./LoadingIndicator";
import { PromptContext } from "../../context/prompts/PromptContext";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { generatePDFDocument } from "../../util/helpers/SharePdf";
import { PDFDocument } from "pdf-lib";
import {
  ShareIcon,
  DocumentArrowDownIcon,
  DocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

export const SportCoachResults = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useSportCoach(user?.id);
  const response = data?.data[0]?.attributes?.payload_out?.resp;
  const responseObj = JSON.parse(response);

  const handleExportToPDF = async () => {
    const pdfBlob = await generatePDFDocument(responseObj, completedExercises);
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, "_blank");
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(() =>
    responseObj.resp.length > 0
      ? responseObj.resp.map((day) => ({
          exercises: day.exercises?.map(() => ({ completed: false })),
        }))
      : []
  );

  const handleExerciseClick = (dayIndex, exerciseIndex) => {
    const updatedCompletedExercises = [...completedExercises];
    if (!updatedCompletedExercises[dayIndex]?.exercises) {
      updatedCompletedExercises[dayIndex] =
        updatedCompletedExercises[dayIndex] || {};
      updatedCompletedExercises[dayIndex].exercises = [];
    }
    updatedCompletedExercises[dayIndex].exercises[exerciseIndex].completed =
      !updatedCompletedExercises[dayIndex].exercises[exerciseIndex]?.completed;
    setCompletedExercises(updatedCompletedExercises);
  };

  const handleShareClick = () => {
    setShowShareButtons(!showShareButtons);
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  if (isLoading) {
    // Mostrar un indicador de carga si los datos están siendo cargados
    return <LoadingIndicator />;
  }

  // Función para compartir el plan de entrenamiento en Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, "_blank");
  };

  // Función para compartir el plan de entrenamiento en WhatsApp
  const shareOnWhatsApp = () => {
    const text = `¡Hola! Te comparto mi plan de entrenamiento:\n\n`;
    const exercises = responseObj.resp.flatMap((day) =>
      day.exercises?.map(
        (exercise) => `${exercise.name}: ${exercise.description}`
      )
    );
    const plan = exercises?.join("\n");
    const body = encodeURIComponent(text + plan);
    const url = `https://wa.me/?text=${body}`;
    window.open(url, "_blank");
  };

  // Función para compartir el plan de entrenamiento por correo electrónico
  const shareByEmail = () => {
    const subject = "Plan de Entrenamiento";
    const body = "Salut! Je partage mon plan d'entraînement:\n\n";
    const exercises = responseObj.resp.flatMap((day) =>
      day.exercises?.map(
        (exercise) => `${exercise.name}: ${exercise.description}`
      )
    );
    const plan = exercises.join("\n");
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body + plan)}`;
    window.location.href = mailtoUrl;
  };

  const { promptTokens } = useContext(PromptContext)?.responseTokens ?? {};
  // Renderizar los resultados una vez que la carga haya finalizado
  return (
    <>
      {responseObj.resp.map((day, index) => (
        <div
          key={index}
          className="border p-4 cursor-pointer w-96 grid"
          onClick={() => setActiveIndex(index)}
        >
          <h3 className="text-lg font-bold mb-2">{day.day}</h3>
          <ol
            className={`${
              activeIndex !== index ? "hidden" : ""
            } list-disc ml-4 whitespace-normal`}
          >
            {day.exercises?.map((exercise, exerciseIndex) => (
              <li
                key={exerciseIndex}
                className="cursor-pointer"
                onClick={() => handleExerciseClick(index, exerciseIndex)}
              >
                <span
                  className={classNames(
                    "inline-flex items-center justify-center h-6 w-6 mr-2 rounded-full",
                    completedExercises[index]?.exercises &&
                      completedExercises[index].exercises[exerciseIndex]
                        ?.completed
                      ? "bg-green-500"
                      : "bg-gray-500"
                  )}
                >
                  <CheckIcon
                    className="h-4 w-4 text-white"
                    aria-hidden="true"
                  />
                </span>
                <span>{exercise.name}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          className="flex justify-center w-96 space-x-4 rounded-md bg-gray-50 px-6 shadow relative"
        >
          <li className="flex items-center w-auto">
            <div className="flex items-center">
              <button
                onClick={handleShareClick}
                className="bg-gray-100 text-gray-700 rounded-md p-2 flex items-center mr-2"
              >
                <ShareIcon className="w-5 h-5 mr-2" /> Partager
              </button>
            </div>
          </li>
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
            <button className="bg-gray-100 text-gray-700 rounded-md p-2 flex items-center mr-2">
              <DocumentIcon className="w-5 h-5 mr-2" /> World"
            </button>
          </li>
          <li className="flex space-x-4 items-center w-auto relative">
            <svg
              className="h-full text-xs w-5 flex-shrink-0 text-gray-400"
              viewBox="0 0 24 44"
              preserveAspectRatio="none"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <button
              onClick={handleExportToPDF}
              className="bg-gray-100 text-gray-700 rounded-md p-2 flex items-center relative"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" /> PDF
              {showShareButtons && (
                <div className="flex flex-col gap-1 absolute right-[21em] bottom-8">
                  <FacebookIcon
                    className="w-8 h-8 mr-2 cursor-pointer"
                    onClick={shareOnFacebook}
                  />
                  <WhatsappIcon
                    className="w-8 h-8 mr-2 cursor-pointer"
                    onClick={shareOnWhatsApp}
                  />
                  <EmailIcon
                    className="w-8 h-8 mr-2 cursor-pointer"
                    onClick={shareByEmail}
                  />
                </div>
              )}
            </button>
          </li>
        </ol>
      </nav>
    </>
  );
};
