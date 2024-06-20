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
import { fontSize } from "@mui/system";

const styles = StyleSheet.create({
  page_view: {
    backgroundColor: "white",
  },
  top_section: {
   margin:"47px",
  },
//   namesection:{
//    textAlign:"center"
//   },
name:{
  fontSize:"25px",
  fontWeight:"bold"
}, 
  address: {
   fontSize:"12px",
//    marginBottom:"8px",
   marginTop:"8px"
  },
  email:{
    fontSize:"11px"
  },
  underline:{
    borderBottom:"1px solid black",
    marginTop:"30px"
  },
  tagline:{
marginTop:"20px",
fontSize:"14px"
  },
  para:{
    marginTop:"30px",
    fontSize:"13px"
  },
  myname:{
    fontSize:"11px",
    marginTop:"12px"
  },
//   
second:{
    marginTop:"30px"
},
heading:{
    fontSize:"10px",
    color:"#808080"
},
headings_data:{
    fontSize:"8px",
},
flex:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:"8px"
},
left_section:{
    flex: "0 0 30%",
    padding: "24px",
    minHeight:"80vh"
}, 
right_section:{
    flex: "0 0 70%",
    padding: "24px",
}
 
});

const CoverLetterTwo = ({ resume }) => {
  // console.log(resume, "resumeeeeeeeeeeeeeeeeeeee");

  const ShowResume = () => {
    return (
      <>
        <Document>
            <Page size="A4">
                <View style={styles.top_section}>
                    <View style={styles.namesection}>
                    <Text style={styles.name}>{resume?.user?.name}</Text>
                    <Text style={styles.address}>{resume?.coverLetter?.jobDescription}</Text>
                    {/* <Text style={styles.underline}></Text> */}
                    </View>

                    <View style={styles.second}>
                        <View style={{display:"flex", alignItems:"center",justifyContent:"center", flexDirection:"row", gap:"50px"}}>
                        <View style={styles.flex}>
                        <Text style={styles.heading}>Address:</Text>
                        <Text style={styles.headings_data}>{resume?.coverLetter?.location}</Text>
                        </View>
                        <View style={styles.flex}>
                        <Text style={styles.heading}>Contact:</Text>
                        <Text style={styles.headings_data}>{resume?.coverLetter?.phone}-{resume?.coverLetter?.email}</Text>
                        </View>
                        </View>
                       
                    </View>

                    <View style={{flexDirection:"row",justifyContent:"center", gap:"10px", marginTop:"30px"}}>
                        <View style={styles.left_section}>
                            <View>
                            <Text style={{fontSize:"8px", marginBottom:"10px"}}>
                            TO,
                        </Text>
                            <Text style={{fontSize:"11px", marginBottom:"4px"}}>
                            Hiring Manager
                        </Text>
                            
                            </View>
                            <View>
                            <Text style={{fontSize:"8px", marginBottom:"10px", marginTop:"40px"}}>
                            FROM,
                        </Text>
                            <Text style={{fontSize:"11px", marginBottom:"4px"}}>
                            {resume?.user?.name}
                        </Text>
                            <Text style={{fontSize:"9px"}}>
                            {resume?.coverLetter?.jobDescription}
                        </Text>
                            </View>
                        </View>
                        <View style={styles.right_section}>
                           <View>
                            <Text style={{fontSize:"11px"}}>
                                Dear Hiring Manager,
                            </Text>
                            <Text style={{fontSize:"9px", marginTop:"13px"}}>
                            {resume?.coverLetter?.description}
                            </Text>
                            <Text style={{fontSize:"9px", marginTop:"10px"}}>
                                Best Regards,
                            </Text>
                            <Text style={{fontSize:"9px", marginTop:"10px"}}>
                            {resume?.user?.name}
                            </Text>
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
      <PDFDownloadLink document={<ShowResume />} fileName="Cover-letter">
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

export default CoverLetterTwo;
