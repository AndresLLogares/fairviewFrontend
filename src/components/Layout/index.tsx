import React from "react";
import { makeStyles } from "@mui/styles";
import { Toaster } from "react-hot-toast";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Box } from "@mui/system";
import "./global.css";

export default function Layout(props: any): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <NavBar />
      <Toaster />
      {props.children}
      <Footer />
    </Box>
  );
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `center`,
    flexDirection: `column`,
    textAlign: `center`,
  },
});
