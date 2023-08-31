// components/matresum/ExportPDF.js
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "blue",
    textAlign: "center",
  },
});

function ExportPDF({ summaryText }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>
            MATTRESUME
          </Text>
          <Text>{summaryText}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default ExportPDF;
