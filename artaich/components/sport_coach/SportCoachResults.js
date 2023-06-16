import React, { useContext, useState } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";

export const SportCoachResults = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useSportCoach(user?.id);
  const response = data?.data[0]?.attributes?.payload_out?.resp;
  const responseObj = JSON.parse(response);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="grid gap-4 justify-center">
      {isLoading ? (
        // Indicador de carga en forma de esqueleto
        <div className="grid gap-4">
          <div className="animate-pulse bg-blue-300 h-4 w-1/2"></div>
          <div className="animate-pulse bg-blue-300 h-4 w-3/4"></div>
          <div className="animate-pulse bg-blue-300 h-4 w-1/4"></div>
        </div>
      ) : (
        // Renderizar los resultados una vez que la carga haya finalizado
        responseObj.resp.map((day, index) => (
          <div
            key={index}
            className="border p-4 cursor-pointer"
            style={{ width: "400px" }} // Ancho fijo del acordeón
            onClick={() => setActiveIndex(index)}
          >
            <h3 className="text-lg font-bold mb-2">{day.day}</h3>
            <ul
              className={`${
                activeIndex !== index ? "hidden" : ""
              } list-disc ml-4 whitespace-normal`} // Salto de línea en el texto
            >
              {day.exercises.map((exercise, exerciseIndex) => (
                <li key={exerciseIndex}>
                  <strong>{exercise.name}: </strong>
                  {exercise.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};
