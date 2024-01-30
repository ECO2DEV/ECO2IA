import { useReducer } from 'react';
import { AUTO_LANGUAGE } from '../constants/constans';

const initialState = {
  fromLanguage: AUTO_LANGUAGE,
  toLanguage: 'Fr',
  toThirdLanguage: 'En',
  fromText: '',
  secondResult: '',
  result: '',
  loading: false
};

function reducer(state, action) {
  const { type } = action;

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    const loading = state.fromText !== '';

    return {
      ...state,
      loading,
      result: '',
      secondResult: '',
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
      secondResult: '',
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
      secondResult: '',
      loading
    };
  }

  if (type === 'SET_TO_THIRD_LANGUAGE') {
    if (state.toThirdLanguage === action.payload || action.payload ===state.toLanguage) return state;
    const loading = state.fromText !== '';

    return {
      ...state,
      toThirdLanguage: action.payload,
      result: '',
      secondResult: '',
      loading
    };
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== '';

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '',
      secondResult: ''
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    };
  }

  if (type === 'SET_SECOND_RESULT') {
    return {
      ...state,
      loading: false,
      secondResult: action.payload
    };
  }

  return state;
}

export const useLangStorage = () => {
  const [
    {
      fromLanguage,
      toLanguage,
      toThirdLanguage,
      fromText,
      result,
      loading,
      secondResult
    },
    dispatch
  ] = useReducer(reducer, initialState);

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };

  const setFromLanguage = (payload) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };

  const setToLanguage = (payload) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };

  const setToThirdLanguage = (payload) => {
    dispatch({ type: 'SET_TO_THIRD_LANGUAGE', payload });
  };

  const setFromText = (payload) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };

  const setResult = (payload) => {
    dispatch({ type: 'SET_RESULT', payload });
  };

  const setSecondResult = (payload) => {
    dispatch({ type: 'SET_SECOND_RESULT', payload });
  };

  return {
    fromLanguage,
    toLanguage,
    toThirdLanguage,
    fromText,
    result,
    loading,
    secondResult,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setToThirdLanguage,
    setFromText,
    setResult,
    setSecondResult
  };
};
