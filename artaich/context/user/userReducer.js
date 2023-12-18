export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };
    case 'SET_OPEN_HELPERS':
      return {
        ...state,
        openHelpers: action.payload
      };
    case 'SET_MODAL_OPEN':
      return {
        ...state,
        modalOpen: action.payload
      };
    case 'SET_SELECTED_MODEL':
      return {
        ...state,
        selectedModel: action.payload
      };
    default:
      return state;
  }
};
