export const exerciseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXERCISE':
      return {
        ...state,
        exercise: action.payload
      };
    case 'SET_IS_EXERCISE':
      return {
        ...state,
        isExercise: action.payload
      };
    case 'SET_RESPONSE_OBJ':
      return {
        ...state,
        responseObj: action.payload
      };

    default:
      return state;
  }
};
