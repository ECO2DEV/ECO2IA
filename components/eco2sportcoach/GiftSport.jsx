import { useContext, useState, useEffect } from 'react';
import { ExerciseContext } from '../../context/exercise/ExerciseContext';

export const GiftSport = ({ exceName }) => {
  const { exercise, isExercise } = useContext(ExerciseContext);
  const [exerciseGift, setExerciseGift] = useState(
    'https://v2.exercisedb.io/image/C1CXmo3ieyhfSQ'
  );

  useEffect(() => {
    // Verificar si el nombre exacto está en el contexto y guardar el gift en el estado
    const exerciseExists = exercise.find(
      (exerciseItem) => exerciseItem.name === exceName
    );
    if (exerciseExists) {
      setExerciseGift(exerciseExists.gifUrl);
    } else {
      // Si no se encuentra el ejercicio, mostrar un regalo aleatorio
      const randomGift =
        exercise[Math.floor(Math.random() * exercise.length)].gifUrl;
      setExerciseGift(randomGift);
    }
  }, [exceName, exercise]); // Se ejecutará solo cuando exceName o exercise cambien


  return (
    <div>
      {exerciseGift ? (
        <img className="w-[3rem] h-[3rem] rounded-full" src={exerciseGift} alt="gym gift" />
      ) : (
        <img className="w-[3rem] h-[3rem] rounded-full" src={exerciseGift} alt="gym gift" />
      )}
    </div>
  );
};
