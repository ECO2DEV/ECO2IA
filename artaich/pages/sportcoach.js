import { SportCoachIA } from "../components/sport_coach/SportCoach";
import Modal from "../components/modal/modal";
import { getUser } from "../util/api/user";

export default function SportCoach(props) {
  return (
    <div className="my-10">
      {/* Condición para renderizar el componente SportCoachIA o el componente Modal */}
      {props.user.plan ? <SportCoachIA user={props.user.id} /> : <Modal />}
    </div>
  );
}

// Función getServerSideProps para obtener los datos del usuario desde el servidor
export const getServerSideProps = async (context) => {
  // Obtener los datos del usuario utilizando la función getUser
  const result = await getUser(context);

  // Verificar si no se obtuvieron datos del usuario
  if (!result?.data) {
    // Redireccionar al inicio si no se obtuvieron datos del usuario
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  // Devolver los datos del usuario y la sesión como propiedades
  return {
    props: {
      user: result?.data,
      session: result?.session,
    },
  };
};
