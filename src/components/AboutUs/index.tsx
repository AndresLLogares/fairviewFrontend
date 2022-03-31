import React, { Suspense, Fragment } from "react";
import { colors } from "../../utils/colors";
import { makeStyles } from "@mui/styles";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Loading from "../Loading";
import { Linkedin } from "@styled-icons/boxicons-logos/Linkedin";
import { Github } from "@styled-icons/boxicons-logos/Github";
import { Phone } from "@styled-icons/boxicons-regular/Phone";
import { Email } from "@styled-icons/evaicons-solid/Email";
import { Discord } from "@styled-icons/fa-brands/Discord";
import { Portfolio } from "@styled-icons/zondicons/Portfolio";

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

  const isSSR = typeof window === "undefined";

  return (
    <Fragment>
      {!isSSR && (
        <Suspense fallback={<Loading />}>
          <div className={classes.root}>
            <Reveal className={classes.reveal} keyframes={customAnimation}>
              <h1 className={classes.title}>About Us</h1>
            </Reveal>
            <Reveal className={classes.reveal} keyframes={customAnimation}>
              <div className={classes.content}>
                <p className={classes.information}>
                  This is a website created using the OpenSea API to show my
                  knowledge of different technologies such as Gatsby, React,
                  Redux, among others. The site is fully functional and
                  transactions can be performed, so please be careful. I hope
                  you enjoy it.
                </p>
              </div>
            </Reveal>
            <Reveal className={classes.reveal} keyframes={customAnimation}>
              <div className={classes.contenteLinks}>
                <p className={classes.information}>
                  You can know more about me by following links
                </p>
                <div className={classes.divWrapper}>
                  <a
                    className={classes.button}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href="https://www.linkedin.com/in/andr%C3%A9s-luis-logares-522595172/"
                  >
                    <Linkedin className={classes.icon} />
                    LinkedIn
                  </a>
                  <a
                    className={classes.button}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href="mailto:andresl940@hotmail.com"
                  >
                    <Email className={classes.icon} />
                    andresl940@hotmail.com
                  </a>
                  <a
                    className={classes.button}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href="https://andreslogares.netlify.app/"
                  >
                    <Portfolio className={classes.icon} />
                    Portfolio
                  </a>
                  <a
                    className={classes.button}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href="https://github.com/AndresLLogares"
                  >
                    <Github className={classes.icon} />
                    Github
                  </a>
                  <a
                    className={classes.button}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href="https://wa.me/5491136005563"
                  >
                    <Phone className={classes.icon} />
                    WhatsApp
                  </a>
                  <a
                    className={classes.button}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href="https://discord.com/"
                  >
                    <Discord className={classes.icon} />
                    AndresLogares#6764
                  </a>
                </div>
              </div>
            </Reveal>
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
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "60%",
    marginBottom: "3rem",
    "@media (max-width: 1280px)": {
      width: "90%",
    },
  },
  contenteLinks: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    marginBottom: "3rem",
    "@media (max-width: 1280px)": {
      width: "90%",
    },
  },
  information: {
    display: "flex",
    flexDirection: "row",
    fontWeight: 900,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    margin: 0,
    fontSize: `3vh`,
    textDecoration: "none",
    color: `${colors.Black}`,
  },
  divWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    flexWrap: "wrap",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  icon: {
    width: "2rem",
    height: "2rem",
    marginRight: "1rem",
    "@media (max-width: 1280px)": {
      marginLeft: "1rem",
    },
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "3rem",
    fontSize: "2vh",
    fontWeight: 900,
    borderRadius: "5px",
    fontFamily: ["Poppins", "sans-serif"].join(","),
    color: `${colors.Black} !important`,
    backgroundColor: colors.White,
    border: `2px solid ${colors.Blue}`,
    transitionDuration: "1s",
    margin: "1rem",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: colors.Red,
      color: `${colors.White} !important`,
      border: `transparent`,
    },
    "@media (max-width: 1280px)": {
      alignItems: "center",
      justifyContent: "flex-start",
      width: "100%",
      fontSize: "1.5vh",
    },
  },
});
