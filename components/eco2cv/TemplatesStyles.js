import { StyleSheet } from "@react-pdf/renderer";
export const stylesOne = StyleSheet.create({
  page: {
    flexDirection: "row-reverse", // Reverse the order of columns
    backgroundColor: "#f2f6fa", // Light blue background
    padding: "5mm",
  },
  firstColumn: {
    flexBasis: "70%",
    backgroundColor: "#ffffff",
    padding: "5mm", // Reduced from '10mm'
    borderRadius: "5mm",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  secondColumn: {
    flexBasis: "30%",
    backgroundColor: "#f2f6fa", // Light blue background for the second column
    marginRight: "2mm",
    marginBottom: "5mm", // Increase the spacing between columns
  },
  heading: {
    fontWeight: "ultrabold",
    fontSize: "15pt",
  },
  subtitle: {
    fontWeight: "medium",
    fontSize: "12pt",
    marginBottom: "1mm",
  },
  thirdTitle: {
    fontWeight: "light",
    fontSize: "10pt",
    marginTop: "2mm",
    marginBottom: "1mm",
  },
  profileText: {
    marginBottom: "5mm",
    fontSize: "10pt",
    textAlign: "justify",
    fontWeight: "light",
    color: "#474b4e",
  },
  bulletPoint: {
    fontSize: "10pt",
    textAlign: "justify",
    fontWeight: "light",
    color: "#474b4e",
  },
  phoneDetail: {
    marginBottom: "5mm",
    marginTop: "-4mm",
    fontSize: "10pt",
    textAlign: "justify",
    fontWeight: "light",
    color: "#474b4e",
  },
  spacing: {
    marginBottom: "5mm",
  },
  pictureContainer: {
    position: "relative", // Required for positioning the overlay
    objectFit: "fill",
    marginBottom: "5mm",
    borderRadius: "5mm",
    overflow: "hidden",
  },
  picture: {
    objectFit: "cover",
    filter: "sepia(0.2) grayscale(0.4) contrast(1.2)", // Adjust filters as needed
  },
  vintageOverlay: {
    position: "absolute",

    backgroundColor: "#c0c0c0", // Replace with the desired vintage overlay color
    opacity: 0.4, // Adjust the opacity as needed for the desired vintage effect
    zIndex: -1,
  },
  skillsText: {
    marginBottom: "5mm",
  },
  languagesText: {
    marginBottom: "5mm",
  },
});

export const stylesTwo = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "10mm",
  },
  firstColumn: {
    flexBasis: "70%",
    marginRight: "10mm",
  },
  secondColumn: {
    flexBasis: "30%",
  },
  heading: {
    fontWeight: "ultrabold",
    fontSize: "15pt",
  },
  subtitle: {
    fontWeight: "medium",
    fontSize: "12pt",
    marginBottom: "1mm",
  },
  thirdTitle: {
    fontWeight: "light",
    fontSize: "10pt",
    marginTop: "2mm",
    marginBottom: "1mm",
  },
  profileText: {
    marginBottom: "5mm",
    fontSize: "10pt",
    textAlign: "justify",
    fontWeight: "light",
    color: "#474b4e",
  },
  bulletPoint: {
    fontSize: "10pt",
    textAlign: "justify",
    fontWeight: "light",
    color: "#474b4e",
  },
  phoneDetail: {
    marginBottom: "5mm",
    marginTop: "-4mm",
    fontSize: "10pt",
    textAlign: "justify",
    fontWeight: "light",
    color: "#474b4e",
  },
  spacing: {
    marginBottom: "5mm",
  },
  pictureContainer: {
    objectFit: "fill",
    height: "40mm",
    marginBottom: "5mm",
    backgroundColor: "#DDD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainer2: {
    objectFit: "fill",
    height: "40mm",
    width: "45mm",
    marginBottom: "5mm",
    backgroundColor: "#DDD",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  widthImage: {
    width: "40mm",
  },
  heightImage: {
    height: "40mm",
  },
  skillsText: {
    marginBottom: "5mm",
  },
  languagesText: {
    marginBottom: "5mm",
  },
});
