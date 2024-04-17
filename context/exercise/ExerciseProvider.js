import { useReducer, useEffect, useState } from 'react';
import { exerciseReducer } from './exerciseReducer';
import { ExerciseContext } from './ExerciseContext';
import moment from 'moment-timezone';

const exerciseInitialState = {
  exercise: [], // save 1300 exercises from the API - gifUrl
  isExercise: false,
  responseObj: {},
  setResponseObj: () => {},
  setIsExercise: () => {},
  setExercise: () => {}
};

export const ExerciseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exerciseReducer, exerciseInitialState);
  const [isGiftExpired, setIsGiftExpired] = useState(false);

  // console.log('is expired', isGiftExpired);

  const setExercise = (exercise) => {
    dispatch({
      type: 'SET_EXERCISE',
      payload: exercise
    });
  };

  const setResponseObj = (responseObj) => {
    dispatch({
      type: 'SET_RESPONSE_OBJ',
      payload: responseObj
    });
  };

  const setIsExercise = (isExercise) => {
    dispatch({
      type: 'SET_IS_EXERCISE',
      payload: isExercise
    });
  };

  useEffect(() => {
    // Función para verificar si es la hora deseada y establecer isExercise en false
    const checkAndUpdateExerciseStatus = () => {
      const currentDateTime = moment(); // Obtener la fecha y hora actual
      const currentDateTimeCentral = currentDateTime.tz('America/Chicago'); // Convertir a hora central de Estados Unidos

      // Verificar si la hora actual es mayor a las 12:00 PM y menor a las 12:59 Am, y si isExercise es true, establecer isExercise en false, pero solo una vez al día
      if (
        currentDateTimeCentral.hour() > 12 &&
        currentDateTimeCentral.hour() < 24 &&
        state.isExercise === true &&
        isGiftExpired === false
      ) {
        setIsExercise(false); // Establecer isExercise en false
        setIsGiftExpired(true);
        // console.log('isExercise under the 12', state.isExercise);
      }
    };
    // Llamar a la función cada hora para verificar la hora actual
    const interval = setInterval(checkAndUpdateExerciseStatus, 3600000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [setIsExercise]);

  return (
    <ExerciseContext.Provider
      value={{
        ...state,
        setExercise,
        setResponseObj,
        setIsExercise
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
