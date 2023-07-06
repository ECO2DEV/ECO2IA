import React from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
export const generatePDFDocument = async (trainingPlan, completedExercises) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 12,
      padding: 20,
    },
    heading: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: "bold",
      color: "blue"
    },
    exercise: {
      marginBottom: 5,
    },
    completed: {
      fontWeight: "bold",
    },
  });

  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        {trainingPlan.resp.map((day, index) => (
          <View key={index}>
            <Text style={styles.heading}>{day.day}</Text>
            {day.exercises?.map((exercise, exerciseIndex) => (
              <Text key={`${index}-${exerciseIndex}`} style={styles.exercise}>
                <Text
                  style={
                    completedExercises[index]?.exercises &&
                    completedExercises[index].exercises[exerciseIndex]?.completed
                      ? styles.completed
                      : null
                  }
                >
                  {exercise.name}: {exercise.description}
                </Text>
              </Text>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );

  const pdfBlob = await pdf(<MyDocument />).toBlob();
  return pdfBlob;
};

