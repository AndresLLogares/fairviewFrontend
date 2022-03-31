import React, { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
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

export default function LoadingComponent(props: any): JSX.Element {
  const classes = useStyles();

  let first = "{";

  let second = "}";

  return (
    <div className={classes.root}>
      <Reveal className={classes.reveal} keyframes={customAnimation}>
        <div className={classes.Loader}>
          <span>{first}</span>
          <span>{second}</span>
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
  Loader: {
    color: colors.Red,
    fontFamily: ["AudioWide"].join(","),
    fontWeight: 900,
    fontSize: "20vh",
    opacity: 0.8,
    "& span": {
      display: "inline-block",
      animation: `$pulse 1s alternate infinite ease-in-out`,
      "& nth-child(odd)": {
        animationDelay: "1s",
      },
    },
  },
  "@keyframes pulse": {
    "to": {
      transform: "scale(0.8) ",
      opacity: "0.5 ",
    },
  },
});
