import TextSummarizerPage from "../components/matresum/TextSummarizer";
import Modal from "../components/modal/modal";
import { getUser } from "../util/api/user";

export default function MatResume(props) {
  return (
    <div className="my-10">
      {props.user.plan ? (
        <TextSummarizerPage user={props.user.id} />
      ) : (
        <Modal />
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const result = await getUser(context);

  if (!result?.data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user: result?.data,
      session: result?.session,
    },
  };
};