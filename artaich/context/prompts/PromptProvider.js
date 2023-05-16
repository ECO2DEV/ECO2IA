import { useReducer, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { PromptContext } from './PromptContext';
import { promptReducer } from './promptReducer';
import countTokens from '../../util/helpers/count_tokens';
import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';

const promptInitialState = {
  prompt: null,
  response: null,
  plan: [],
  promptTokens: 0,
  responseTokens: 0,
  setResponseTokens: () => {},
  setPromptTokens: () => {},
  setResponse: () => {},
  setPrompt: () => {},
  setPlan: () => {},
  updatePlanTokens: () => {}
};

export const PromptProvider = ({ children }) => {
  const router = useRouter();
  const [idsUpdateMaxTokens, setIdsUpdateMaxTokens] = useState({
    userId: null,
    planId: null
  });

  const [state, dispatch] = useReducer(promptReducer, promptInitialState);
  const countTokensMemo = useMemo(() => countTokens, []);

  const setPrompt = (prompt) => {
    dispatch({
      type: 'SET_PROMPT',
      payload: prompt
    });
  };

  const setResponse = async (response) => {
    // Para que no pueda hacer el llamado a la API si no han escogido plan
    if (state.plan.length === 0) {
      // Agregar mensaje para que diga que no hay plan
      router.push('/dashboard');
      return;
    }
    dispatch({
      type: 'SET_RESPONSE',
      payload: response
    });
  };

  useEffect(() => {
    if (!state.prompt) return;
    const resptokens = countTokensMemo(state.prompt);
    dispatch({
      type: 'SET_PROMPT_TOKENS',
      payload: resptokens
    });
  }, [state.prompt, countTokensMemo]);

  const setPlan = async (id) => {
    try {
      const { data } = await axios.get(
        `${strapiUrl}/api/plans/${id}?populate=*`,
        header
      );

      // console.log('Plan data', data?.data);
      const { attributes } = data?.data;

      setIdsUpdateMaxTokens({
        userId: attributes?.users_permissions_user?.data?.id,
        planId: id
      });
      // console.log(
      //   'idsUpdateMaxTokens',
      //   attributes?.users_permissions_user?.data?.id
      // );
      dispatch({
        type: 'LOAD_PLAN',
        payload: attributes
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.response?.data.message
        };
      }
    }
  };

  // Este useEffect cada vez que se actualiza el response, resta a
  // sumatoria de tokens del prompt y el response al max_tokens del plan
  useEffect(() => {
    if (!state.response) return;
    if (state.promptTokens === 0 || state.plan.max_tokens <= 0) return;
    // Si no hay plan, redirigir a dashboard
    if (state.plan.length === 0) {
      return;
    }
    let responseTokens;
    let updatedMaxImages;
    let totalTokens;

    if (Array.isArray(state.response) && state.response.length > 0) {
      // Si la respuesta es un array (DALL·E) y tiene imágenes
      updatedMaxImages = state.plan.max_imagens -= 2; // Restar 2 imágenes
      totalTokens = state.promptTokens;
    } else {
      // Si la respuesta es un string (GPT-3)
      responseTokens = countTokensMemo(state.response);
      totalTokens = responseTokens + state.promptTokens;
    }

    // console.log('AI Response Tokens', responseTokens);

    const updatedMaxTokens = (state.plan.max_tokens -= totalTokens);
    // const updatedMaxImages = (state.plan.max_imagens -= 1);

    const maxTokensUpdated = {
      data: {
        typo: state.plan.typo,
        max_tokens: updatedMaxTokens,
        max_imagens: updatedMaxImages,
        users_permissions_user: idsUpdateMaxTokens.userId
      }
    };

    axios
      .put(
        `${strapiUrl}/api/plans/${idsUpdateMaxTokens.planId}`,
        maxTokensUpdated,
        header
      )
      .then((res) => {
        console.log('Updated plan', res.data.data);
        dispatch({
          type: 'UPDATE_PLAN_TOKENS',
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.log('Error updating plan', error);
      })
      .finally(() => {
        dispatch({
          type: 'SET_PROMPT_TOKENS',
          payload: 0
        });
      });
  }, [state.response]);

  const setPromptTokens = (promptTokens) => {
    dispatch({
      type: 'SET_PROMPT_TOKENS',
      payload: promptTokens
    });
  };

  return (
    <PromptContext.Provider
      value={{
        ...state,
        setPlan,
        setPrompt,
        setResponse,
        setPromptTokens
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
