import { makeStyles, } from "@mui/styles";
import { headerColor, primaryColor, secondaryColor, textColor, textSecondaryColor } from "../constants/Colors";
import { heroBannerAnimated, heroBannerBackground } from "../constants/Images";
import { keyframes } from '@mui/system';


const spin = keyframes`
    0% {
        transform: translateX(-150px);
    }
    100% {
        transform: translateX(820px);
    }
`;

const useStyles = makeStyles((theme) => ({
  //HeroSection
  heroHeading: {
    fontSize: "3rem !important",
    fontWeight: "500 !important",
    color: textColor,
  },
  heroSubHeading: {
    fontSize: "1.2rem !important",
    fontWeight: "400 !important",
    color: textSecondaryColor,
    marginTop: "1rem",
    lineHeight: "1.6rem",
  },
  heroInput: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    width: "100%",
    "&.MuiFormControl-root .MuiOutlinedInput-root": {
      paddingLeft: "10px !important",

    },
    "&.MuiFormControl-root .MuiOutlinedInput-root .MuiOutlinedInput-input": {
      height: "28px",
      background: `${headerColor} !important`,
    },

    "&.MuiFormControl-root .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
    {
      borderRadius: "0",
    },
  },
  heroAnimatedWrapper: {
    background: `url(${heroBannerBackground}) no-repeat center center/cover`,
    minHeight: "600px",
    position: "relative",
    '&::after': {
      content: '""',
      background: `url(${heroBannerAnimated}) repeat-x center center/cover`,
      position: "absolute",
      backgroundPosition: "0 20%, 0 95%, 0 0, 0 100%, 0 0",
      minHeight: "70%",
      width: "70%",
      animation: `${spin} 1s linear infinite`,
      top: "40px !important",
      right: "0px !important",
      left: "120px"
    }
  },
  heroBtn: {
    "&.MuiButton-root": {
      color: headerColor,
      fontWeight: "500",
      background: primaryColor,
      borderRadius: "0px",
      marginTop: "10px",
      padding: "12px 30px",
      fontSize: "15px !important",
      textTransform: "capitalize",
      border: "2px solid",
      borderColor: headerColor,
    },
    "&:hover": {
      background: headerColor,
      color: primaryColor,
      border: "2px solid",
      borderColor: primaryColor,
      transition: "all 0.3s ease-in-out"
    },
  },
  HeroCompanyCard: {
    background: headerColor,
    padding: "20px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
    height: "140px",
    textAlign: "center",
    border: "1px solid #e5e5e5",
    width: "80%",
    borderRadius: "0px !important",
    "& .MuiTypography-root": {
      color: textColor,
      fontWeight: "500",
      fontSize: "1.2rem",
      textTransform: "uppercase",
    },
    "&:hover": {
      transform: "translateY(-15px)",
      transition: "all 0.5s ease-in-out"
    }
  },
  browseCompanyCard: {
    background: headerColor,
    border: "1px solid #e5e5e5",
    borderRadius: "0px !important",
    "&:hover": {
      background: primaryColor,
      "& .MuiTypography-root": {
        color: headerColor,
      },
      border: "1px solid",
      borderColor: primaryColor,
      transition: "all 0.5s ease-in-out"
    }
  },
  JobStatusTab: {
    "&.MuiTabs-root": {
      minHeight: "25px",
    },
    "&.MuiTabs-root .MuiTabs-scroller .MuiTabs-flexContainer .MuiButtonBase-root":
    {
      textTransform: "capitalize !important",
      fontSize: "20px",
      color: "#999 !important",
      minHeight: "25px !important ",
    },
    "&.MuiTabs-root .MuiTabs-scroller .MuiTabs-flexContainer .MuiButtonBase-root svg":
    {
      fontSize: "18px",
    },
    "&.MuiTabs-root .MuiTabs-scroller .MuiTabs-indicator": {
      backgroundColor: "#4C8FBD",
      top: 0,
      display: "none",
    },
    "&.MuiTabs-root .MuiTabs-scroller .MuiTabs-flexContainer .Mui-selected": {
      color: `${primaryColor} !important`,
      background: "white !important",
      borderRight: "1px solid #C5D0DC",
    },
  },

  //Footer
  footerTypo: {
    color: textColor,
    fontWeight: "300 !important",
    fontSize: "15px !important",
    lineHeight: "30px !important",
  },
  footerHead: {
    color: "black",
    fontSize: "20px !important",
    margin: "10px 0 !important",
    fontWeight: "500 !important",
  },
  footerSocialContainer: {
    marginTop: "5px",
    "&>a": {
      "&>svg": {
        color: headerColor,
        fontSize: "18px",
        margin: "0 5px",
        background: primaryColor,
        borderRadius: "50%",
        cursor: "pointer",
        padding: "10px",
        border: "2px solid",
        borderColor: headerColor,
        "&:hover": {
          background: headerColor,
          border: "2px solid",
          borderColor: primaryColor,
          color: primaryColor,
          transition: "all 0.3s ease-in-out"
        },
      },
    }
  },

  footerBtnStyle: {
    "&.MuiButton-root": {
      color: "black",
      fontWeight: "500",
      background: secondaryColor,
      borderRadius: "0px",
      marginTop: "10px",
      padding: "12px 30px",
      fontSize: "15px !important",
      textTransform: "capitalize",
      border: "2px solid",
      borderColor: secondaryColor,
    },
    "&:hover": {
      background:secondaryColor,
      color: "black",
      border: "2px solid",
      borderColor: secondaryColor,
      transition: "all 0.3s ease-in-out"
    },
  },

  footerPolicy: {
    color: secondaryColor,
    fontWeight: "400 !important",
    fontSize: "16px !important",
    lineHeight: "30px !important",
    marginLeft: "10px !important",
  },

  //Login
  loginHeading: {
    color: "black",
    fontSize: "2.5rem !important",
    fontWeight: "500 !important",
    textAlign:"center"
  },
  loginFormHeading: {
    color: textColor,
    fontSize: "2rem !important",
    fontWeight: "500 !important",
  },

  //FindAJob
  jobCardContainer: {
    background: headerColor,
    border: "2px solid #e5e5e5",
    borderRadius: "5px !important",
    marginTop: "10px",
    width: "90%",
    padding: "10px",
    cursor: "pointer"
  },

  //Dashboard
  sidebarContainer: {
    border: "2px solid #e5e5e5",
    padding: "20px"
  }
}));




///////////////////////











export default useStyles;
