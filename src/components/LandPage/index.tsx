import React, { lazy, Suspense, Fragment } from "react";
import { colors } from "../../utils/colors";
import { makeStyles } from "@mui/styles";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Loading from "../Loading";
const Collection = React.lazy(() => import("../Collections"));

const customAnimation = keyframes`
  from {
    transform: rotateX(80deg);
    opacity: 0;
  }
 to{
    transform: rotateX(0);
    opacity: 1;
  }`;

export default function LandPage(props: any): JSX.Element {
  const classes = useStyles();

  const isSSR = typeof window === "undefined";

  return (
    <Fragment>
      {!isSSR && (
        <Suspense fallback={<Loading />}>
          <div className={classes.root}>
            <Reveal className={classes.reveal} keyframes={customAnimation}>
              <h1 className={classes.title}>FairView</h1>
            </Reveal>
            <div className={classes.boxSubtitle}>
              <Reveal className={classes.reveal} keyframes={customAnimation}>
                <h3 className={classes.subtitle}>
                  Discover, collect and sell incredible NFTs
                </h3>
              </Reveal>
            </div>
            <Collection />
          </div>
        </Suspense>
      )}
    </Fragment>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    textAlign: `center`,
    marginTop: `12rem`,
    marginBottom: `3rem`,
  },
  reveal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    display: "flex",
    fontWeight: 900,
    fontFamily: ["AudioWide"].join(","),
    margin: 0,
    fontSize: `8vh`,
    marginBottom: "3rem",
    "@media (max-width: 1280px)": {
      fontSize: `5vh`,
    },
  },
  boxSubtitle: {
    display: "flex",
    width: "30%",
    height: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    marginBottom: "3rem",
    "@media (max-width: 1280px)": {
      width: "90%",
    },
  },
  subtitle: {
    display: "flex",
    width: "100%",
    margin: 0,
    fontWeight: 900,
    fontFamily: ["Poppins"].join(","),
    fontSize: `5vh`,
    "@media (max-width: 1280px)": {
      fontSize: `3vh`,
    },
  },
});
