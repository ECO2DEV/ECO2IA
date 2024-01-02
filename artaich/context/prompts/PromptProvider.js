import { useReducer, useEffect, useMemo, useState, useContext } from 'react';
import { UserContext } from '../user/UserContext';
import { useRouter } from 'next/router';
import { PromptContext } from './PromptContext';
import { promptReducer } from './promptReducer';
import { countTokens } from '../../util/helpers/count_tokens';
import axios from 'axios';
import { strapiUrl, header } from '../../constants/constans';
import { toast } from 'react-hot-toast';

const promptInitialState = {
  activeAI: null,
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
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [idsUpdateMaxTokens, setIdsUpdateMaxTokens] = useState({
    userId: null,
    planId: null
  });

  const [state, dispatch] = useReducer(promptReducer, promptInitialState);
  const countTokensMemo = useMemo(() => countTokens, []);

  const setActiveAI = (aiName) => {
    dispatch({
      type: 'SET_ACTIVE_AI',
      payload: aiName
    });
  };

  const setPrompt = (prompt) => {
    dispatch({
      type: 'SET_PROMPT',
      payload: prompt
    });
  };

  const updateUserPlanToNull = async (userId) => {
    // si el userId es undefined o null, utilice el userid del contexto de usuario
    if (!userId) {
      userId = user.id;
    }

    try {
      await axios.put(
        `${strapiUrl}/api/users/${userId}?populate=*`,
        { plan: null },
        header
      );
      // console.log('Updated user plan to null');
    } catch (error) {
      console.log('Error updating user plan', error);
    }
  };

  const setResponse = async (response) => {
    // Para que no pueda hacer el llamado a la API si no han escogido plan
    if (state.plan.length === 0) {
      // Add message to user to select a plan
      toast.error('Vous n avez pas de plan');
      setTimeout(() => {
        router.push('/#pricing');
        return;
      }, 1000);
    }
    if (state.plan.max_tokens <= 0) {
      toast.error(
        'Vous n avez plus de jetons à utiliser, veuillez acheter un nouveau plan'
      );
      setTimeout(() => {
        router.push('/#pricing');
        return;
      }, 1000);
    }
    dispatch({
      type: 'SET_RESPONSE',
      payload: response
    });
  };

  useEffect(() => {
    if (!state.prompt) return;
    // validate that the user has maxtokens to use, if not redirect to buy a plan
    if (state.plan.length === 0) {
      toast.error('Vous n avez pas de plan');
      setTimeout(() => {
        router.push('/dashboard');
        return;
      }, 500);
    }
    if (state.plan.max_tokens <= 0) {
      toast.error(
        "Vous n'avez plus de jetons à utiliser, veuillez acheter un nouveau plan"
      );
      //setTimer(5);
      setTimeout(() => {
        // updateUserPlanToNull(idsUpdateMaxTokens.userId);
        router.push('/dashboard');
        return;
      }, 500);
    }
    const resptokens = countTokensMemo(state.prompt);
    dispatch({
      type: 'SET_PROMPT_TOKENS',
      payload: resptokens
    });
  }, [state.prompt]);

  // useEfect for set response tokens when the response is set
  useEffect(() => {
    if (!state.response) return;
    // validate that the user has maxtokens to use, if not redirect to buy a plan
    if (state.plan.length === 0) return;
    if (state.plan.max_tokens <= 0) {
      toast.error(
        "Vous n'avez plus de jetons à utiliser, veuillez acheter un nouveau plan"
      );
      // updateUserPlanToNull(idsUpdateMaxTokens.userId);
      router.push('/dashboard');
      return;
    }
    // validation, if is a dalle response, count only the prompt
    if (Array.isArray(state.response) && state.response.length > 0) {
      return;
    }
    const resptokens = countTokensMemo(state.response);
    dispatch({
      type: 'SET_RESPONSE_TOKENS',
      payload: resptokens
    });
  }, [state.response]);

  const setPlan = async (id) => {
    try {
      const { data } = await axios.get(
        `${strapiUrl}/api/plans/${id}?populate=*`,
        header
      );
      // validate that the user has maxtokens to use, if not, redirect to buy a plan
      if (state.plan.max_tokens <= 0) {
        router.push('/dashboard');
        return;
      }

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
    if (state?.plan?.max_tokens <= 0) return;

    // if it is not a plan so return and do not update the plan
    if (state.plan.length === 0) {
      return;
    }
    let responseTokensCount;
    let updatedMaxImages;
    let totalTokens;

    // If the response is an array (DALL·E) and has more than 1 image
    if (Array.isArray(state.response) && state.response.length > 0) {
      updatedMaxImages = state.plan.max_imagens -= 2; // Restar 2 imágenes
      totalTokens = state.promptTokens;
      // console.log('DALL·E Response Tokens', totalTokens);
    } else {
      // If the response is a string (GPT-3 - mattraduct)

      responseTokensCount = countTokensMemo(state.response);
      totalTokens = responseTokensCount + state.promptTokens;
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
        // console.log('Updated plan', res.data.data);
        dispatch({
          type: 'UPDATE_PLAN_TOKENS',
          payload: res.data.data
        });
      })
      .catch((error) => {
        console.error('Error updating plan', error);
      })
      .finally(() => {
        if (
          state.activeAI === 'ChatGpt' ||
          state.activeAI === 'DalleIA' ||
          state.activeAI === 'MatquizAI'
        ) {
          dispatch({
            type: 'SET_PROMPT_TOKENS',
            payload: 0
          });
        }
      });
  }, [state.response]);

  const setPromptTokens = (promptTokens) => {
    dispatch({
      type: 'SET_PROMPT_TOKENS',
      payload: promptTokens
    });
  };

  const setResponseTokens = (responseTokens) => {
    dispatch({
      type: 'SET_RESPONSE_TOKENS',
      payload: responseTokens
    });
  };

  return (
    <PromptContext.Provider
      value={{
        ...state,
        setActiveAI,
        setPlan,
        setPrompt,
        setResponse,
        setPromptTokens,
        setResponseTokens
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
