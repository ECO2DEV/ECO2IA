import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";
import { LoadingIndicator } from "./LoadingIndicator";
import ExportPDF from "./ExportPDF";
import dynamic from "next/dynamic";

// Import PDFDownloadLink separately before the component definition
const PDFDownloadLinkDynamic = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
  }
);
import {
  ShareIcon,
  DocumentArrowDownIcon,
  DocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "next-share";
import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

export const SportCoachResults = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useSportCoach(user?.id);
  const response = data?.data[0]?.attributes?.payload_out?.resp;
  const responseObj = JSON.parse(response);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(() => {
    if (!responseObj?.resp?.length) return [];

    return responseObj.resp.map((day) => ({
      exercises: day.exercises?.map(() => ({ completed: false })),
    }));
  });

  const handleExerciseClick = (dayIndex, exerciseIndex) => {
    const updatedCompletedExercises = [...completedExercises];
    if (!updatedCompletedExercises[dayIndex]?.exercises) {
      updatedCompletedExercises[dayIndex] =
        updatedCompletedExercises[dayIndex] || {};
      updatedCompletedExercises[dayIndex].exercises = [];
    }
    if (!updatedCompletedExercises[dayIndex].exercises[exerciseIndex]) {
      updatedCompletedExercises[dayIndex].exercises[exerciseIndex] = {};
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

  const generateTrainingPlanContent = () => {
    let content = "Salut! Je partage mon plan d'entraînement :\n\n";
    responseObj.resp.forEach((day) => {
      content += `${day.day}:\n`;
      day.exercises.forEach((exercise) => {
        content += `${exercise.name}: ${exercise.description}\n`;
      });
      content += "\n";
    });
    return content;
  };

  const shareOnFacebook = () => {
    const content = generateTrainingPlanContent();
    const shareContent = encodeURIComponent(content);
    const url = `https://www.facebook.com/sharer/share${shareContent}`;
    window.open(url, "_blank");
  };

  const shareOnWhatsApp = () => {
    const content = generateTrainingPlanContent();
    const shareText = encodeURIComponent(content);
    const url = `https://wa.me/?text=${shareText}`;
    window.open(url, "_blank");
  };

  const shareByEmail = () => {
    const subject = "Plan de Entrenamiento";
    const content = generateTrainingPlanContent();
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(content)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="p-6 min-h-[60rem]">
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
            } ml-4 whitespace-normal`}
          >
            {day &&
              day.exercises.map((exercise, exerciseIndex) => (
                <li
                  key={exerciseIndex}
                  className={classNames(
                    completedExercises[index]?.exercises[exerciseIndex]
                      ?.completed
                      ? "text-indigo-600"
                      : "text-gray-500",
                    "flex items-center"
                  )}
                  onClick={() => handleExerciseClick(index, exerciseIndex)}
                >
                  <span className="flex h-9 items-center">
                    {completedExercises[index]?.exercises[exerciseIndex]
                      .completed ? (
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
          className="flex justify-center w-96 space-x-4 rounded-md bg-gray-50 px-6 shadow absolute"
        >
          <li className="flex items-center w-auto text-gray-500 hover:text-gray-500">
            <button
              onClick={handleShareClick}
              className="flex items-center p-2 rounded-md hover:bg-gray-100"
            >
              <ShareIcon className="w-5 h-5 mr-1" /> Partager
            </button>
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
            <button className="flex items-center p-2 rounded-md hover:bg-gray-100">
              <DocumentIcon className="w-5 h-5 mr-1" /> Word
            </button>
          </li>
          <PDFDownloadLinkDynamic
            document={<ExportPDF generateTrainingPlanContent={generateTrainingPlanContent} />}
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
              <button
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <DocumentArrowDownIcon className="w-5 h-5 mr-1" /> Pdf
              </button>
            </li>
          </PDFDownloadLinkDynamic>
        </ol>
      </nav>

      {showShareButtons && (
        <div className="relative w-4 bottom-[8rem] left-4 gap-2 z-10 flex flex-col justify-center">
          <FacebookShareButton
            className="h-4 w-4"
            // url={window.location.href}
            quote={generateTrainingPlanContent()}
          >
            <FacebookIcon size={38} round />
          </FacebookShareButton>
          <WhatsappShareButton
            className="h-4 w-4"
            url={window.location.href}
            title={generateTrainingPlanContent()}
          >
            <WhatsappIcon size={38} round />
          </WhatsappShareButton>
          <EmailShareButton
            className="h-4 w-4"
            url={window.location.href}
            subject="plan de formation"
            body={generateTrainingPlanContent()}
          >
            <EmailIcon size={38} round />
          </EmailShareButton>
        </div>
      )}
    </div>
  );
};
