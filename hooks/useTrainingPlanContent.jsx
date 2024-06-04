

export const useTrainingPlanContent = ({responseObj}) => {

  let content = '¡Hola! Comparto mi plan de entrenamiento :\n\n';
  if (responseObj) {
    responseObj?.resp?.forEach((day) => {
      content += `${day.day}:\n`;
      if (day.exercises) {
        day.exercises.forEach((exercise) => {
          content += `${exercise.name}: ${exercise.description}\n`;
        });
        content += '\n';
      }
    });
  }
  return {
    content
  }
};

