
import Features from '../components/features_section/features';
import Hero from '../components/hero_section/hero';
import styles from '../styles/Home.module.css';
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import axios from 'axios'
import Pricing from '../components/pricing_section/pricing';
import Dalle from '../components/dalle/dalle';
import ChatGPT from '../components/chatgpt/chatgpt';


export default function Home() {
  const {data:session} = useSession();
  //gitconsole.log("Session is :" + session);
  return (
    
    <div className={styles.container}>
    <Hero/>
    <Features/>
    <Pricing/>
       {/* <h1>Auth Test</h1> */}

{/* <div>
    {!session && <>
    Not signed in or session expired <br/>
    <button>Sign in</button>
  </>}
  {session && <>
    Signed in as {session.user.email} <br/>
    El nombre de usuario es {session.user.name}
    <button onClick={() => signOut()}>Sign out</button>
  </>}
</div> */}
     

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' ECO2'}
          <img src="/vercel.svg" alt="Eco2" className={styles.logo} />
        </a>
      </footer> */}


      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
// export async function getServerSideProps({req}) {
//   let headers = {}
//   const session = await getSession({ req });
//   console.log("Session" + JSON.stringify(session));
//   if (session) {
//     headers = {Authorization: `Bearer ${session.jwt}`};
//   }
//   let data = 'xxx'
//   return {props: {data: data}} ;

// }
