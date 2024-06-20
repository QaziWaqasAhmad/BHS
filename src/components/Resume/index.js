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
//   top_section: {
//     backgroundColor: "#19509F",
//     color: "white",
//     marginTop: "20px",
//     marginLeft: "20px",
//     marginRight: "20px",
//     textAlign: "center",
//     padding: "20px",
//     borderRadius: "8px",
//   },
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
    // margin: "20px",
  },
  left_section: {
    flex: "0 0 70%",
    padding: "24px",
  },
  right_section: {
    // backgroundColor: "#D3DDF9",
    backgroundColor: "#19509F",
    flex: "0 0 30%",
    padding: "20px",
    minHeight:"80vh"
    // borderRadius: "8px",
  },
  grays:{
 color:"gray"
  },
  headings: {
    color: "#fff",
    marginBottom: "4px",
    fontSize: "17px",
    fontWeight: "bold",
    textDecoration:"underline"
  },
  headingss: {
    color: "#000",
    marginBottom: "4px",
    fontSize: "17px",
    fontWeight: "bold",
    textDecoration:"underline"
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
    color: "gray",
  },
  right_title: {
   fontSize:"18px",
   marginBottom:"8px",
   fontWeight:"bolder",
   color:"#fff"
  },
  right_position: {
   fontSize:"10px",
   marginBottom:"30px",
   color:"gray"

  },
  borders:{
border:"4px solid #051225"
  }
});

const Resume = ({ resume }) => {
  console.log(resume, "resumeeeeeeeeeeeeeeeeeeee");

  const ShowResume = () => {
    return (
      <>
        <Document>
          <Page size="A4" style={styles.page_view}>
            {/* TOP-SECTION */}
            {/* <View style={styles.top_section}>
              <Text style={styles.underline}>Noman Khan</Text>
              <Text style={styles.position}>
                {" "}
                {resume?.resume?.jobDescription}
              </Text>
            </View> */}

            {/* user-detail section */}
            <View style={styles.borders}>
              <View style={styles.flex_section}>
             
                <View style={styles.right_section}>
                    <View>
                        <Text style={styles.right_title}>{resume?.user?.name}</Text>
                        <Text style={styles.right_position}>{resume?.resume?.jobDescription}</Text>
                    </View>
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
                <View style={styles.left_section}>
                  <View>
                    <Text style={styles.headingss}>SUMMARY</Text>
                    <Text style={styles.summary_text}>
                      {resume?.resume?.about}
                    </Text>
                  </View>
                  <View style={styles.space}>
                    <Text style={styles.headingss}>EXPRIENCE</Text>
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
                    <Text style={styles.headingss}>Education</Text>
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
                    <Text style={styles.headingss}>Portfolio</Text>
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

export default Resume;
