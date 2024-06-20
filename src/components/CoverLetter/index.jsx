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
   margin:"30px",
  },
  namesection:{
   textAlign:"center"
  },
  address: {
   fontSize:"14px",
   marginBottom:"5px",
   marginTop:"5px"
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
  }

 
});

const CoverLetter = ({ resume }) => {
 
 
  const ShowResume = () => {
    return (
      <>
        <Document>
            <Page size="A4">
                <View style={styles.top_section}>
                    <View style={styles.namesection}>
                    <Text>{resume?.user?.name}</Text>
                    <Text style={styles.address}> {resume?.coverLetter?.location}</Text>
                    <Text style={styles.email}>{resume?.coverLetter?.phone}- {resume?.coverLetter?.email}</Text>
                    <Text style={styles.underline}></Text>
                    </View>

                    <View>
                        <Text style={styles.tagline}>To: Dear Hiring Manager</Text>
                        <Text style={styles.para}>{resume?.coverLetter?.description}.</Text>
                        <Text style={styles.para}>Sincerey,</Text>
                        <Text style={styles.myname}>{resume?.user?.name}</Text>
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

export default CoverLetter;
