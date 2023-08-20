import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { DataMatTraduct } from "../../data/mattraduct";

const styles = StyleSheet.create({
  page: { 
    flexDirection: "row",
    padding: 30 
  },
  header: {
    position: "absolute",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    flexBasis: "50%", 
    padding: 20,
    marginTop: 23,
    marginBottom: 23,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  title: {
    color: "blue",
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 5
  },
  text: {
    flexWrap: "wrap",
    textAlign: "justify",
    fontSize: 14
  }
});

const ExportPDF = ({ translationResponse, prompt }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}> {DataMatTraduct.MatTraduct} </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{DataMatTraduct.YourText}</Text>
        <Text style={styles.text}>{prompt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{DataMatTraduct.Translation}</Text>
        <Text style={styles.text}>{translationResponse}</Text>
      </View>
    </Page>
  </Document>
);

export default ExportPDF;
