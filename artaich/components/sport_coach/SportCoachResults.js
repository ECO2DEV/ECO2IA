import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";

export const SportCoachResults = () => {
  const { user } = useContext(UserContext); // Obtiene el usuario del contexto
  const { data, isLoading } = useSportCoach(user?.id); // Obtiene los datos y estado de carga del uso de useSportCoach hook
  const response = data?.data[0].attributes.payload_out.resp; // Extrae la respuesta de los datos obtenidos

  // Expresión regular para encontrar los patrones en la respuesta
  const regex = /(Day \d+):([\s\S]*?)(?=(Day \d+:)|$)/g;
  const matches = [...response.matchAll(regex)]; // Encuentra todas las coincidencias en la respuesta

  // Convierte las coincidencias en un arreglo de objetos con el día y la rutina
  const exerciseRoutine = matches.map((match) => ({
    day: match[1].trim(),
    routine: match[2].trim(),
  }));

  const [activeDay, setActiveDay] = useState(null); // Estado para almacenar el día activo

  if (isLoading) {
    // Si está cargando, muestra un indicador de carga
    return (
      <div className="border border-blue-300 shadow p-4 w-full">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no está cargando, muestra la lista de días y rutinas
  return (
    <div className="grid gap-4 justify-center">
      {exerciseRoutine.map((day, index) => {
        const exercises = day.routine.split("\n\n").map((item) => item.trim()); // Divide las rutinas en ejercicios

        const isActive = index === activeDay; // Determina si el día actual está activo

        return (
          <div
            key={index}
            className={`border border-blue-300 shadow-md rounded-md p-4 ${
              isActive ? "bg-blue-100" : ""
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-2 text-blue-800 cursor-pointer ${
                isActive ? "text-blue-600" : ""
              }`}
              onClick={() => setActiveDay(index)} // Establece el día activo al hacer clic
            >
              {day.day}
            </h3>
            <div
              className={`transition-all max-h-0 overflow-hidden ${
                isActive ? "max-h-96" : ""
              }`}
            >
              {exercises.map((exercise, exerciseIndex) => (
                <p key={exerciseIndex} className="text-blue-800 mb-2">
                  {exercise}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
