import { getSession } from 'next-auth/react';
import axios from 'axios';
import Profile from '../components/profile/profile';
export default function profile(props) {
    const user = props.user; 
    return(
        
        <Profile user={user}/>
    )
};

export const getServerSideProps = async (context) => {
    
    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    const session = await getSession(context);
  
    let user = null;
    // Check if session exists or not, if not, redirect
  
    if (session) {
      try {
  
        const { data } = await axios.get(`${strapiUrl}/api/users/` + session.id +'?populate[0]=avatar', {
          headers: {
            Authorization:
              `Bearer ${strapiToken}`,
          },
        });
        user = data;
      } catch (e) {
        console.log(e);
      }
    }
  
    if (!user) {
      return {
  
        redirect: {
          permanent: false,
          destination: '/'
        }
      }
    }
  
    return {
      props: {
        user,
        session
      }
    }
  };
