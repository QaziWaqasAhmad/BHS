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
    color: "#19509F",
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    textAlign: "center",
    padding: "10px",
  },
  top__section:{
    color: "#19509F",
    marginLeft: "20px",
    marginRight: "20px",
    textAlign: "center",
    padding: "13px",
  },
  name:{
   fontWeight:"bold",
   fontSize:"20px",
   marginBottom:"8px",
   textTransform:"uppercase"
  },
  underline: {
    fontWeight: "bold",
    borderBottom:"2px solid gray",
    marginTop:"6px"

  },
   display:{
    marginTop: "0px",
    marginLeft: "30px",
    marginRight: "30px",
    padding:"20px",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row"
   },
   title:{
     fontSize:"14px",
     color:"#19509F",
     fontWeight:"bold",
     textAlign:"center",
     margin:"auto",
     marginBottom:"6px"
   },
   titlecontent:{
    fontSize:"11px",
    color:"black",
    textAlign:"center",
    margin:"auto"
   },
   summaryt_section:{
    marginTop: "-22px",
    marginLeft: "20px",
    marginRight: "20px",
    textAlign: "center",
    padding: "20px",
   },
   exprience_section:{
    marginTop: "-30px",
    marginLeft: "20px",
    marginRight: "20px",
    textAlign: "center",
    padding: "20px",
   },
   summaryt_title:{
    color:"#19509F",
    fontSize:"14px",
    textAlign:"left",
    marginBottom:"5px"
   },
   summary_content:{
      textAlign:"left",
      fontSize:"10px",
      marginBottom:"8px"
   },
   expreince_company:{
      textAlign:"left",
      fontSize:"12px",
      marginBottom:"4px",
      fontWeight:"bold"
   },
   company:{
      textAlign:"left",
      fontSize:"12px",
      marginBottom:"4px",
      fontWeight:"bold",
      textDecoration:"underline",
      
   },
   expreince_position:{
      textAlign:"left",
      fontSize:"10px",
      marginBottom:"8px"
   },
   expreince_date:{
      textAlign:"left",
      fontSize:"8px",
      marginBottom:"5px",
      color:"#19509F",
      fontWeight:"bold"
   },
   expreince_content:{
      textAlign:"left",
      fontSize:"10px",
      marginBottom:"8px"
   },
  position: {
    fontSize: "12px",
    fontWeight: "light",
    textTransform: "uppercase",
    color:"black"
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
    marginTop: "10px",
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
  skills:{
    backgroundColor:"#19509F",
    width:"60px",
    color:"white",
    padding:"10px",
    fontSize:"10px",
    borderRadius:"12px",
  },
  chips:{
   flexDirection:"row",
   justifyContent:"space-between",
   gap:"4px",
display:"flex",
justifyContent:"center",
alignItems:"center"
  },
});

const ResumeThree = ({ resume }) => {
  console.log(resume, "resumeeeeeeeeeeeeeeeeeeee");
  const ShowResume = () => {
    return (
      <>
        <Document>
          <Page size="A4" style={styles.page_view}>
            {/* TOP-SECTION */}
            <View style={styles.top_section}>
              <Text style={styles.name} >{resume?.user?.name}</Text>
              <Text style={styles.position}>
              {resume?.user?.name}
              </Text>
              <Text style={styles.underline}>

              </Text>
            </View>
         
          <View style={{marginTop:"-32px"}}>
            <View style={styles.top__section}>
              <View style={styles.display}>
                <View>
                    <Text style={styles.title}>CONTACT</Text>
                    <Text style={styles.titlecontent}>{resume?.resume?.phone}</Text>
                </View>
                <View>
                <Text style={styles.title}>EMAIL</Text>
                    <Text style={styles.titlecontent}>{resume?.resume?.email}</Text>
                </View>
                <View>
                <Text style={styles.title}>ADDRESS</Text>
                    <Text style={styles.titlecontent}>{resume?.resume?.location}</Text>
                </View>
                
              </View>
              <Text style={styles.underline}>

              </Text>
            </View>
            </View>


             <View style={styles.summaryt_section}>
                <View>
                    <Text style={styles.summaryt_title}>SUMMARY</Text>
                    <Text style={styles.summary_content}>{resume?.resume?.about}</Text>
                </View>
                <Text style={styles.underline}>

              </Text>
             </View>

              <View style={styles.exprience_section}>
                <View>
                    <Text style={styles.summaryt_title}>EXPREINCE</Text>
                    {resume?.resume?.experience.map((item, index) => (
                      <View key={index}>
                    <Text style={styles.expreince_company}>{item.company}</Text>
                    <Text style={styles.expreince_position}>{item.title}</Text>
                    <Text style={styles.expreince_date}> {`${moment(item.startYear).format(
                              "YYYY"
                            )} - ${moment(item.endYear).format("YYYY")}`}</Text>
                    <Text style={styles.expreince_content}>{item.description}</Text>
                    </View>
                    ))}
                </View>
                <Text style={styles.underline}>

              </Text>
              </View>

              <View style={styles.exprience_section}>
                <View> 
                    <Text style={styles.summaryt_title}>EDUCATION</Text>
                    {resume?.resume?.education?.map((item, index) => (
                    <>
                    <Text style={styles.company}>{item.title}</Text>
                    <Text style={styles.expreince_position}>{item?.institute}</Text>
                    <Text style={styles.expreince_date}> {`${moment(item.startYear).format("YYYY")} - ${moment(
                            item.endYear
                          ).format("YYYY")}`}</Text>
                    <Text style={styles.expreince_date}>{item.description}</Text>
                    </>
                    ))}
                </View>
                <Text style={styles.underline}>

              </Text>
              </View>


               <View style={styles.summaryt_section}>
                <View>
                    <Text style={styles.summaryt_title}>SKILLS</Text>
                    <View style={styles.chips}>
                    {resume?.resume?.skills?.map((item, index) => (
                    <Text style={styles.skills}> {item?.title}</Text>
                    ))}
                    </View>
                </View>
               </View>
             







            {/* user-detail section */}
            {/* <View>
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
            </View> */}
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

export default ResumeThree;
