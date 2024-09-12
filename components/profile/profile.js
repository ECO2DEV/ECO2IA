import Head from 'next/head';
import ProfileContainer from './ProfileContainer';

export default function Profile({ user }) {
  return (
    <>
      <Head>
        <link rel="eco2 icon" href="/iconografia/eco2it_logo.jpeg" />
        <title>Editar Perfil</title>
      </Head>

      <ProfileContainer user={user} />
    </>
  );
}
