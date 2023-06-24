import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";
import { LoadingIndicator } from "./LoadingIndicator";
import { saveAs } from "file-saver";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ShareIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";

export const SportCoachResults = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useSportCoach(user?.id);
  const response = data?.data[0]?.attributes?.payload_out?.resp;
  const responseObj = JSON.parse(response);
  console.log(isLoading);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareButtons, setShowShareButtons] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(() =>
    responseObj.resp.map((day) => ({
      exercises: day.exercises.map(() => ({ completed: false })),
    }))
  );

  const handleExerciseClick = (dayIndex, exerciseIndex) => {
    const updatedCompletedExercises = [...completedExercises];
    updatedCompletedExercises[dayIndex].exercises[exerciseIndex].completed =
      !updatedCompletedExercises[dayIndex].exercises[exerciseIndex].completed;
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

  // Componente PDF del plan de entrenamiento
  const PlanEntrenamientoPDF = () => (
    <Document>
      <Page>
        <View>
          <Text>Plan de Entrenamiento</Text>
          {responseObj.resp.map((day) => (
            <View key={day.day}>
              <Text>{day.day}</Text>
              {day.exercises.map((exercise) => (
                <Text key={exercise.name}>
                  {exercise.name}: {exercise.description}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  // Función para exportar el plan de entrenamiento a PDF
  const exportToPDF = () => {
    const asPdf = <PlanEntrenamientoPDF />;
    const blob = new Blob([asPdf], { type: "application/pdf" });
    saveAs(blob, "plan_entrenamiento.pdf");
  };

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
      day.exercises.map(
        (exercise) => `${exercise.name}: ${exercise.description}`
      )
    );
    const plan = exercises.join("\n");
    const body = encodeURIComponent(text + plan);
    const url = `https://wa.me/?text=${body}`;
    window.open(url, "_blank");
  };

  // Función para compartir el plan de entrenamiento por correo electrónico
  const shareByEmail = () => {
    const subject = "Plan de Entrenamiento";
    const body = "¡Hola! Te comparto mi plan de entrenamiento:\n\n";
    const exercises = responseObj.resp.flatMap((day) =>
      day.exercises.map(
        (exercise) => `${exercise.name}: ${exercise.description}`
      )
    );
    const plan = exercises.join("\n");
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body + plan)}`;
    window.location.href = mailtoUrl;
  };

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
            {day.exercises.map((exercise, exerciseIndex) => (
              <li
                key={exerciseIndex}
                className={classNames(
                  completedExercises[index]?.exercises[exerciseIndex]?.completed
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
      <div className="flex items-center justify-between mt-4 px-4 z-10 bg-gray-50 relative">
        <PDFDownloadLink
          document={<PlanEntrenamientoPDF />}
          fileName="plan_entrenamiento.pdf"
        >
          <button className="text-black font-bold py-2 rounded">
            <DocumentArrowDownIcon className="w-6 h-6 inline-block" /> PDF
          </button>
        </PDFDownloadLink>
        <button className="flex gap-2 text-black font-bold py-2 rounded">
          <DocumentTextIcon class="h-6 w-6" /> Word
        </button>
        <button className="flex gap-2 text-black font-bold py-2 rounded">
          <ShareIcon
            onClick={handleShareClick}
            className="w-6 h-6 cursor-pointer text-black"
          />
          Partager
        </button>
        {showShareButtons && (
          <div className="flex flex-col items-center gap-2 absolute bottom-12 right-16 bg-gray-50 p-2 rounded shadow">
            <button
              className="text-black font-bold rounded"
              onClick={shareOnFacebook}
            >
              <FacebookIcon className="w-12 h-12 hover:bg-blue-700 rounded inline-block" />
            </button>
            <button
              className="text-black font-bold rounded"
              onClick={shareOnWhatsApp}
            >
              <WhatsappIcon className="w-12 h-12 inline-block" />
            </button>
            <button
              className="text-black font-bold rounded"
              onClick={shareByEmail}
            >
              <EmailIcon className="w-12 h-12 inline-block" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
