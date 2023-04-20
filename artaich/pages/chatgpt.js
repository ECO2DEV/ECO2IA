import ChatGpt from '../components/chatgpt/chatgpt';
import { getSession } from 'next-auth/react';
import axios from 'axios';

export default function chatgpt(props) {
  return <ChatGpt user={props.user.id} />;
}
export const getServerSideProps = async (context) => {
  //const session = await getSession(context);
  const strapiToken = process.env.API_TOKEN;
  const strapiUrl = process.env.STRAPI_URL;
  const session = await getSession(context);
  // console.log("Retorne session"+ JSON.stringify(session))

  let user = null;
  // Check if session exists or not, if not, redirect

  if (session) {
    try {
      // console.log(session.id)
      //console.log(session)
      // console.log("Entre aqui " + strapiToken);
      const { data } = await axios.get(
        `${strapiUrl}/api/users/` + session.id + '?populate[0]=avatar',
        {
          headers: {
            Authorization: `Bearer ${strapiToken}`
          }
        }
      );
      user = data;
      //console.log(user);
    } catch (e) {
      // console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  return {
    props: {
      user,
      session
    }
  };
};
