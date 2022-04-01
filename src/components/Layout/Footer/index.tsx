import React, { Suspense, Fragment } from "react";
import { colors } from "../../../utils/colors";
import { makeStyles } from "@mui/styles";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const customAnimation = keyframes`
  from {
    transform: rotateX(80deg);
    opacity: 0;
  }
 to{
    transform: rotateX(0);
    opacity: 1;
  }`;

export default function AboutUs(props: any): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Reveal className={classes.reveal} keyframes={customAnimation}>
        <div className={classes.reveal}>
          <div className={classes.footer}>
            <a
              className={classes.links}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >
              © 2022 Andres Luis Logares. All rights reserved
            </a>
            <a
              className={classes.links}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noreferrer"
              href="https://docs.opensea.io/"
            >
              Open Sea API
            </a>
          </div>
        </div>
      </Reveal>
    </div>
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
    marginTop: `3rem`,
    marginBottom: `2rem`,
  },

  reveal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  footer: {
    display: "flex",
    width: "95%",
    backgroundColor: colors.Pink,
    borderTop: `5px solid ${colors.Red}`,
    alignItems: "center",
    justifyContent: "space-around",
    "@media (max-width: 1280px)": {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  links: {
    display: "flex",
    color: colors.Black,
    fontSize: "2vh",
    margin: 0,
    fontWeight: 900,
    marginTop: "2rem",
    fontFamily: ["Poppins"].join(","),
  },
});
