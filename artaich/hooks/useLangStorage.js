import { useReducer } from 'react';
import { AUTO_LANGUAGE } from '../constants/constans';

const initialState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
};

function reducer(state, action) {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGES') {
    // lógica del estado dentro del reducer
    // porque lo evitamos en los componentes
    // state.fromLanguage === AUTO_LANGUAGE no hacemos nada
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    // loading, si el texto no está vacío entonces loading es true
    const loading = state.fromText !== '';

    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state;

    const loading = state.fromText !== '';

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== '';

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading
    };
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== '';

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: ''
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    };
  }

  return state;
}

export const useLangStorage = () => {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };

  const setFromLanguage = (payload) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };

  const setToLanguage = (payload) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };

  const setFromText = (payload) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };

  const setResult = (payload) => {
    dispatch({ type: 'SET_RESULT', payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  };
};
