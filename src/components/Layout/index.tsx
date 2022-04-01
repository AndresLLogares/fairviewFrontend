import React, { lazy, Suspense, Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { Toaster } from "react-hot-toast";
import { Box } from "@mui/system";
import Loading from "../Loading";
const NavBar = React.lazy(() => import("./Navbar"));
const Footer = React.lazy(() => import("./Footer"));

import "./global.css";

export default function Layout(props: any): JSX.Element {
  const classes = useStyles();
  const isSSR = typeof window === "undefined";

  return (
    <Fragment>
      {!isSSR && (
        <Suspense fallback={<Loading />}>
          <Box className={classes.root}>
            <NavBar />
            <Toaster />
            {props.children}
            <Footer />
          </Box>
        </Suspense>
      )}
    </Fragment>
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
