
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
  console.log("Session is :" + session);
  return (
    
    <div className={styles.container}>
    <Hero/>
    <Features/>
    <Pricing/>
    {/* <Dalle/>
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-gray-500">Continue</span>
      </div>
    </div> */}
    {/* <ChatGPT/> */}
   
    <h1>Auth Test</h1>

<div>
    {!session && <>
    Not signed in <br/>
    <button>Sign in</button>
  </>}
  {session && <>
    Signed in as {session.user.email} <br/>
    El nombre de usuario es {session.user.name}
    <button onClick={() => signOut()}>Sign out</button>
  </>}
</div>
      {/* <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main> */}

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
