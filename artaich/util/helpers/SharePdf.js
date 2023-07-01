import React from "react";
import { Document, Page, Text, StyleSheet, pdf } from "@react-pdf/renderer";

export const generatePDFDocument = async (responseObj, completedExercises) => {
  
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
      {responseObj.resp.map((day, index) => (
        <Page key={index} style={styles.page}>
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
        </Page>
      ))}
    </Document>
  );

  return pdf(<MyDocument />).toBlob();
}
