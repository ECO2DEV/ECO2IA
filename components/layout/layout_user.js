import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { PromptContext } from '../../context/prompts/PromptContext';
import { Toaster } from 'react-hot-toast';
import { Header } from './sidebar/Header';

export default function LayoutUser({ children }) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [discountTokensModal, setDiscountTokensModal] = useState(0);

  // const currentPath = useRouter().pathname; // Obtener la ruta actual

  const { setPlan } = useContext(PromptContext);

  // const { max_imagens = 0, max_tokens = 0 } = plan;

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!children?.props?.user?.plan) return;
    setPlan(children.props.user.plan ? children.props.user.plan.id : null);
  }, []);

  useEffect(() => {
    if (!children?.props?.user) return;
    setUser(children?.props?.user);
  }, [children?.props?.user]);

  // const { attributes } = plan;
  // console.log(JSON.stringify(children.props.user));

  // useEffect for discountTokensModal
  // useEffect(() => {
  //   setDiscountTokensModal(promptTokens + responseTokens);
  //   if (response && (activeAI === 'ChatGPT' || activeAI === 'DalleIA')) {
  //     setTimeout(() => {
  //       setDiscountTokensModal(0);
  //     }, 2000);
  //   }
  // }, [response, responseTokens, activeAI]);
  // // useEffect for start counting the tokens in 0, after the next response
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (
  //       activeAI === 'ChatGPT' ||
  //       activeAI === 'DalleIA' ||
  //       activeAI === 'Eco2quizAI'
  //     ) {
  //       setPromptTokens(0);
  //     }
  //     setResponseTokens(0);
  //     setDiscountTokensModal(0);
  //   }, 3000);
  // }, [response, responseTokens]);

  return (
    <>
      {/* Removing the scroll for let chatGpt to scroll with his own scrollbar (overflow-y-hidden h-screen)*/}

      <Header children={children} />
      <main className="overflow-y-auto h-screen">{children}</main>

      <Toaster position="top-center" />
    </>
  );
}
