import React, { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";
import { useSportCoach } from "../../hooks/useSportCoach";

export const SportCoachResults = () => {
  const { user } = useContext(UserContext);
  const { data, isLoading } = useSportCoach(user?.id);
  const reversedData = data?.data?.slice().reverse();

  const parsedResponse = JSON.parse(
    reversedData[0].attributes.payload_out.resp
  );

  if (isLoading) {
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

  return (
    <div className="flex flex-wrap gap-4 justify-center items-stretch">
      {parsedResponse.ExerciseRoutine.map((day, index) => (
        <div
          key={index}
          className="border border-blue-300 shadow-md rounded-md p-4 w-full sm:w-1/2 lg:w-1/3"
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-800">
            {day?.Day}
          </h3>
          {day.Exercises.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className="mb-4">
              <p>
                <span className="font-semibold text-blue-800">
                  Exercise Name:{" "}
                </span>
                {exercise.ExerciseName}
              </p>
              {exercise.Sets && (
                <p>
                  <span className="font-semibold text-blue-800">Sets: </span>
                  {exercise.Sets}
                </p>
              )}
              {exercise.Reps && (
                <p>
                  <span className="font-semibold text-blue-800">Reps: </span>
                  {exercise.Reps}
                </p>
              )}
              {exercise.Duration && (
                <p>
                  <span className="font-semibold text-blue-800">
                    Duration:{" "}
                  </span>
                  {exercise.Duration}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
