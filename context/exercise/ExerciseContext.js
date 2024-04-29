import { createContext } from 'react';

export const ExerciseContext = createContext({
  exercise: [],
  isExercise: false,
  responseObj: {},
  setResponseObj: () => {},
  setExercise: () => {},
  setIsExercise: () => {}
});
