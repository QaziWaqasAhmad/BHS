import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
  PDFViewer,
  Svg,
  Rect,
  Polygon
} from "@react-pdf/renderer";
import moment from "moment";
import { Email, Lock } from "@mui/icons-material";

const styles = StyleSheet.create({
  page_view: {
    backgroundColor: "white",
  },
  top_section: {
    backgroundColor: "#19509F",
    color: "white",
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
  },
  underline: {
    // textDecoration:"underline",
    fontSize: "28px",
    marginBottom: "15px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  position: {
    fontSize: "12px",
    fontWeight: "light",
    textTransform: "uppercase",
  },
  flex_section: {
    justifyContent: "center",
    flexDirection: "row",
    margin: "20px",
  },
  left_section: {
    flex: "0 0 70%",
    padding: "24px",
  },
  right_section: {
    backgroundColor: "#D3DDF9",
    flex: "0 0 30%",
    padding: "20px",
    borderRadius: "8px",
  },
  headings: {
    color: "#19509F",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  summary_text: {
    fontSize: "10px",
  },
  space: {
    marginTop: "20px",
  },
  padding: {
    paddingBottom: "1px",
    fontSize: "9px",
  },
  expreince: {
    marginTop: "7px",
    fontSize: "10px",
  },
  contact: {
    marginTop: "7px",
    fontSize: "10px",
    color: "#19509F",
  },
});

const ResumeTwo = ({ resume }) => {
  console.log(resume, "resumeeeeeeeeeeeeeeeeeeee");

  const ShowResume = () => {
    return (
      <>
        <Document>
          <Page size="A4" style={styles.page_view}>
            {/* TOP-SECTION */}
            <View style={styles.top_section}>
              <Text style={styles.underline}> {resume?.user?.name}</Text>
              <Text style={styles.position}>
                {" "}
                {resume?.resume?.jobDescription}
              </Text>
            </View>

            {/* user-detail section */}
            <View>
              <View style={styles.flex_section}>
                <View style={styles.left_section}>
                  <View>
                    <Text style={styles.headings}>SUMMARY</Text>
                    <Text style={styles.summary_text}>
                      {resume?.resume?.about}
                    </Text>
                  </View>
                  <View style={styles.space}>
                    <Text style={styles.headings}>EXPRIENCE</Text>
                    {resume?.resume?.experience.map((item, index) => (
                      <View key={index}>
                        <Text style={styles.padding}>{item.title}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={styles.padding}>{item.company}</Text>
                          <Text style={styles.padding}>
                            {`${moment(item.startYear).format(
                              "YYYY"
                            )} - ${moment(item.endYear).format("YYYY")}`}
                          </Text>
                        </View>
                        <Text style={styles.expreince}>{item.description}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.space}>
                    <Text style={styles.headings}>Education</Text>
                    {resume?.resume?.education?.map((item, index) => (
                      <View key={index} style={{ marginTop: "5px" }}>
                        <Text
                          style={{
                            ...styles.padding,
                            textDecoration: "underline",
                            fontWeight: "bold",
                            fontSize: "11px",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text style={styles.padding}>{item?.institute}</Text>
                        <Text style={styles.padding}>
                          {`${moment(item.startYear).format("YYYY")} - ${moment(
                            item.endYear
                          ).format("YYYY")}`}
                        </Text>
                        <Text style={styles.padding}>{item.description}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.space}>
                    <Text style={styles.headings}>Portfolio</Text>
                    {resume?.resume?.portFolio?.map((item, index) => (
                      <View key={index} style={{ marginTop: "5px" }}>
                        <Text
                          style={{
                            ...styles.padding,
                            fontWeight: "bold",
                            fontSize: "11px",
                          }}
                        >
                          {item.title}
                        </Text>
                        <Text style={styles.padding}>{item?.link}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.right_section}>
                  <View>
                    <Text style={styles.headings}>Contact</Text>
                    <Text style={styles.contact}>{resume?.resume?.email}</Text>
                    <Text style={styles.contact}>{resume?.resume?.phone}</Text>
                    <Text style={styles.contact}>
                      {resume?.resume?.location}
                    </Text>
                  </View>
                  <View style={styles.space}>
                    <Text style={styles.headings}>Skills</Text>
                    {resume?.resume?.skills?.map((item, index) => (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.contact}>•</Text>
                        <Text style={{ ...styles.contact, paddingLeft: "3px" }}>
                          {item?.title}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </>
    );
  };

  return (
    <>
      <PDFDownloadLink document={<ShowResume />} fileName="Resume">
        {({ loading, error }) =>
          loading ? <button>loading</button> : <button>download</button>
        }
      </PDFDownloadLink>
      
      <PDFViewer width={"100%"} height={"700px"}>
        <ShowResume />
      </PDFViewer>
    </>
  );
};

export default ResumeTwo;
