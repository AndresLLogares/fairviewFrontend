import React from "react";
import { makeStyles } from "@mui/styles";
import { Toaster } from "react-hot-toast";

import "./global.css";

export default function Layout(props: any): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toaster />
      {props.children}
    </div>
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
