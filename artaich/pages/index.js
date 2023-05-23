import Features from '../components/features_section/features';
import Hero from '../components/hero_section/hero';
import styles from '../styles/Home.module.css';
import { getUser } from '../util/api/user';
import Pricing from '../components/pricing_section/pricing';

export default function Home(props) {
  //console.log("User connected:" + JSON.stringify(props.user))

  const user = props?.user || null;

  return (
    <div className={styles.container}>
      <Hero user={user} />
      <Features />
      <Pricing user={user} />

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
  );
}

export const getServerSideProps = async (context) => {
  const result = await getUser(context);

  // console.log('User connected:' + JSON.stringify(data));
  return {
    props: {
      user: JSON.stringify(result?.data) || null,
      session: result?.session || null
    }
  };
};
