import { useRouter } from 'next/router';
import ExerciseDetailCard from '../../components/eco2sportcoach/ExerciseDetailCard';

const ExerciseDetail = ({ userId }) => {
  const router = useRouter();
  const { slug } = router.query;

  const allExercises = localStorage.getItem('exercises');
  const exercisesParse = JSON.parse(allExercises);

  // Buscar el ejercicio específico
  const exerciseExists = exercisesParse.value.find(
    (exerciseItem) => exerciseItem.name === slug
  );

  if (!exerciseExists) {
    // Buscar ejercicios similares
    const similarExercises = exercisesParse.value.filter((exerciseItem) =>
      exerciseItem.name.includes(slug)
    );

    // Si hay ejercicios similares, mostrarlos
    if (similarExercises.length > 0) {
      return (
        <ExerciseDetailCard
          exercises={similarExercises}
          userId={userId}
          slug={slug}
        />
      );
    } else {
      // Si no hay ejercicios similares, seleccionar uno aleatorio
      const randomExercise =
        exercisesParse.value[
          Math.floor(Math.random() * exercisesParse.value.length)
        ];
      return (
        <ExerciseDetailCard
          exercises={randomExercise}
          userId={userId}
          slug={slug}
        />
      );
    }
  } else {
    // Si el ejercicio existe, mostrarlo
    return (
      <ExerciseDetailCard
        exercises={exerciseExists}
        userId={userId}
        slug={slug}
      />
    );
  }
};

export async function getServerSideProps({ query }) {
  const { userId } = query;

  try {
    if (!userId) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        userId
      }
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true
    };
  }
}
export default ExerciseDetail;
