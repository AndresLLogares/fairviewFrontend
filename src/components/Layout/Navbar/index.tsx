import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar } from "@mui/material";
import useWindowSize from "../../../utils/useWindowSize";
import Logo from "../../../assets/images/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../utils/colors";
import { ThMenu } from "@styled-icons/typicons/ThMenu";
import { CloseCircle } from "@styled-icons/evaicons-solid/CloseCircle";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ADDUSER, GETWALLET, SETWALLET } from "../../../redux/Actions";
import scroll from "../../../utils/scroll";
import toast from "react-hot-toast";

import { Link } from "gatsby";

export default function NavBar(): JSX.Element {
  const dispatch = useDispatch();

  const scrollNow = scroll();

  const { activateBrowserWallet, account } = useEthers();

  const { width } = useWindowSize();

  const [dropOpen, setDropOpen] = useState(false);

  const [fixDrop, setFixDrop] = useState(false);

  const [animation, setAnimation] = useState(false);

  const classes = useStyles();

  const dataSelector = useSelector((state: any) => state);

  const wallet = dataSelector?.fairview?.wallet;

  useEffect(() => {
    if (width <= 1280) {
      setDropOpen(false);
      setFixDrop(false);
    }
  }, [width]);

  const balance = useEtherBalance(wallet.wallet) || 0;

  useEffect(() => {
    const getCurrentAccount = async () => {
      if (account) {
        await dispatch(SETWALLET(account, balance));
        await dispatch(ADDUSER(account));
      }
    };
    const getBalance = async () => {
      if (balance) {
        await dispatch(SETWALLET(wallet.wallet, balance));
        await dispatch(ADDUSER(wallet.wallet));
      }
    };
    getCurrentAccount();
    getBalance();
    dispatch(GETWALLET());
  }, [account, balance, dispatch, wallet.wallet]);

  const handlePopup = () => {
    setAnimation(!animation);
  };

  const handleConnect = async () => {
    await activateBrowserWallet();
    toast.success("Connected to Metamask");
    setAnimation(false);
  };

  const handleDrop = () => {
    setDropOpen(!dropOpen);
    setFixDrop(!fixDrop);
  };

  return (
    <React.Fragment>
      <div
   
        className={scrollNow === 0 ? classes.appBarTransparent : classes.appBar}
      >
        <div className={classes.toolBar}>
          {animation ? (
            <div className={animation ? classes.root : classes.rootHidden}>
              <div className={classes.divButton}>
                <button onClick={handlePopup} className={classes.button}>
                  <CloseCircle className={classes.icon} />
                </button>
              </div>
              <div className={classes.divTitle}>
                <h3 className={classes.title}>Please connect to Metamask</h3>
              </div>
              <div className={classes.divInformation}>
                <p className={classes.information}>
                  MetaMask is a bridge that allows you to visit the distributed
                  web of tomorrow in your browser today. It allows you to run
                  Ethereum dApps right in your browser without running a full
                  Ethereum node.
                </p>
              </div>
              <div className={classes.divLink}>
                <a
                  rel="noreferrer"
                  className={classes.link}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  href="https://metamask.io/"
                >
                  More info: https://metamask.io
                </a>
              </div>
              <div className={classes.divConnect}>
                <button
                  onClick={handleConnect}
                  className={classes.buttonConnect}
                >
                  Connect
                </button>
              </div>
            </div>
          ) : null}
          <div className={classes.divLogo}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <p className={classes.textLogo}>FairView</p>
          </div>
          <div className={classes.divLinks}>
            {width > 1280 ? (
              <>
                <Link
                  className={classes.links}
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  <button className={classes.buttons}>home</button>
                </Link>
                <Link
                  className={classes.links}
                  to="/aboutus"
                  style={{ textDecoration: "none" }}
                >
                  <button className={classes.buttons}>about us</button>
                </Link>
                {wallet?.wallet?.length !== 0 ? (
                  <Link
                    className={classes.links}
                    to="/account"
                    style={{ textDecoration: "none" }}
                  >
                    <button className={classes.buttons}>account</button>
                  </Link>
                ) : (
                  <Link
                    className={classes.links}
                    to=""
                    style={{ textDecoration: "none" }}
                  >
                    <button onClick={handlePopup} className={classes.buttons}>
                      connect metamask
                    </button>
                  </Link>
                )}
              </>
            ) : (
              <>
                {!dropOpen ? (
                  <button
                    className={classes.buttonResponsive}
                    onClick={() => handleDrop()}
                  >
                    <ThMenu className={classes.iconNavbar} />
                  </button>
                ) : (
                  <button
                    className={classes.buttonResponsive}
                    onClick={() => handleDrop()}
                  >
                    <CloseCircle className={classes.iconNavbarClose} />
                  </button>
                )}
              </>
            )}
          </div>
          {width < 1280 && fixDrop ? (
            <div className={dropOpen ? classes.visible : classes.hidden}>
              <Link
                className={classes.links}
                to="/"
                style={{ textDecoration: "none" }}
              >
                <button className={classes.buttons}>home</button>
              </Link>
              <Link
                className={classes.links}
                to="/aboutus"
                style={{ textDecoration: "none" }}
              >
                <button className={classes.buttons}>about us</button>
              </Link>
              {wallet?.wallet?.length !== 0 ? (
                <Link
                  className={classes.links}
                  to="/account"
                  style={{ textDecoration: "none" }}
                >
                  <button className={classes.buttons}>account</button>
                </Link>
              ) : (
                <Link
                  className={classes.links}
                  to=""
                  style={{ textDecoration: "none" }}
                >
                  <button onClick={handlePopup} className={classes.buttons}>
                    connect metamask
                  </button>
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  appBarTransparent: {
    display: "flex",
    backgroundColor: `transparent !important`,
    height: "7rem",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundSize: "contain",
    borderBottom: `transparent !important`,
    boxShadow: "none !important",
    transition: "background-color 1s ease",
    zIndex: 5,
  },
  appBar: {
    display: "flex",
    position: "fixed",
    backgroundColor: `${colors.Pink} !important`,
    height: "7rem",
    width: "100%",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundSize: "contain",
    borderBottom: `2px solid ${colors.Red}`,
    boxShadow: "5px 5px 15px 5px rgba(0,0,0,0)",
    transition: "background-color 1s ease",
    zIndex: 5,
  },
  logo: {
    width: "4rem",
    height: "4rem",
    marginRight: "1rem",
    "@media (max-width: 1280px)": {
      width: "3rem",
      height: "3rem",
    },
  },
  textLogo: {
    display: "flex",
    fontWeight: 900,
    fontFamily: ["AudioWide"].join(","),
    fontSize: "3vh",
    color: colors.Black,
    "@media (max-width: 1280px)": {
      fontSize: "2vh",
    },
  },
  toolBar: {
    display: "flex",
    width: "95%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    "@media (max-width: 1280px)": {
      justifyContent: "center",
    },
  },
  divLogo: {
    display: "flex",
    width: "20%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconNavbar: {
    width: "2.5rem",
  },
  iconNavbarClose: {
    width: "5rem",
  },
  buttonResponsive: {
    width: "5rem",
    height: "10vh",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    backgroundColor: "transparent",
    border: "none",
    transitionDuration: "1s",
    "&:hover": {
      backgroundColor: "transparent",
      opacity: 0.5,
    },
  },
  divLinks: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    "@media (max-width: 1280px)": {
      width: "100%",
    },
  },
  links: {
    display: "flex",
    "@media (max-width: 1280px)": {
      width: "100%",
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "15rem",
    height: "12vh",
    fontSize: "2vh",
    fontWeight: 800,
    borderRadius: "0px",
    textTransform: "uppercase",
    fontFamily: ["Poppins", "sans-serif"].join(","),
    color: `${colors.Black} !important`,
    backgroundColor: "transparent",
    border: "none",
    transitionDuration: "1s",
    "&:hover": {
      cursor: "pointer",
      color: `${colors.Red} !important`,
    },
    "@media (max-width: 1280px)": {
      fontWeight: 500,
      borderLeft: "none",
      borderBottom: `2px solid ${colors.Red}`,
      width: "100%",
      height: "4rem",
      margin: "0",
    },
  },
  visible: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    height: "fit-content",
    top: "12vh",
    right: "0",
    backgroundColor: colors.Pink,
    boxShadow: "-14px 21px 31px -6px rgba(0,0,0,0.5);",
    zIndex: 10,
    animation: `$bounceInLeft 1s`,
  },
  hidden: {
    display: "flex",
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "65%",
    height: "fit-content",
    top: "12vh",
    right: "0",
    backgroundColor: colors.Pink,
    boxShadow: "-14px 21px 31px -6px rgba(0,0,0,0.5);",
    zIndex: 10,
    animation: `$bounceOutLeft 1s`,
  },
  "@keyframes bounceOutLeft": {
    "0%": {
      transform: "translateX(0)",
    },
    "20%": {
      opacity: 1,
      transform: "translateX(20px)",
    },
    "100%": {
      opacity: 0,
      transform: "translateX(-2000px)",
    },
  },
  "@keyframes bounceInLeft": {
    "0%": {
      opacity: 0,
      transform: "translateX(-2000px);",
    },
    "60%": {
      opacity: 1,
      transform: " translateX(30px);",
    },
    "80%": {
      transform: "translateX(-10px);",
    },
    "100%": {
      transform: "translateX(0);",
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "fit-content",
    backgroundColor: `${colors.White}`,
    backgroundImage: `repeating-linear-gradient(45deg, #F7FFF7 25%, transparent 25%, transparent 75%, 
      #F7FFF7 75%, #F7FFF7), repeating-linear-gradient(45deg, #F7FFF7 25%, #ffffff 25%, #ffffff 75%, #F7FFF7 75%, #F7FFF7)`,
    backgroundPosition: `0 0, 10px 10px`,
    backgroundSize: `20px 20px`,
    border: `5px solid ${colors.Blue}`,
    borderRadius: "5px",
    position: "fixed",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    animation: `$bounceInLeft 1s`,
    top: "20%",
    left: "20%",
  },
  rootHidden: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "60%",
    height: "fit-content",
    backgroundColor: `${colors.White}`,
    backgroundImage: `repeating-linear-gradient(45deg, #F7FFF7 25%, transparent 25%, transparent 75%,
       #F7FFF7 75%, #F7FFF7), repeating-linear-gradient(45deg, #F7FFF7 25%, #ffffff 25%, #ffffff 75%, #F7FFF7 75%, #F7FFF7)`,
    backgroundPosition: `0 0, 10px 10px`,
    backgroundSize: `20px 20px`,
    border: `5px solid ${colors.Blue}`,
    borderRadius: "5px",
    position: "fixed",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    animation: `$bounceOutLeft 1s`,
    top: "20%",
    left: "20%",
  },
  divButton: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginRight: "2rem",
    marginTop: "2rem",
    marginBottom: "0.5rem",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "4rem",
    height: "4rem",
    backgroundColor: `transparent`,
    border: "transparent",
    color: `${colors.Blue}`,
    borderRadius: "50%",
    transitionDuration: "1s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `transparent`,
      color: `${colors.Black}`,
    },
  },
  icon: {
    width: "3rem",
    height: "3rem",
  },
  divTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    height: "fit-content",
    marginBottom: "2rem",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    fontSize: "4vh",
    fontWeight: 900,
    color: `${colors.Black}`,
    fontFamily: ["Poppins"].join(","),
    margin: 0,
  },
  divInformation: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "fit-content",
    marginBottom: "2rem",
  },
  information: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    fontSize: "2vh",
    fontWeight: 500,
    margin: 0,
    color: `${colors.Black}`,
    fontFamily: ["Poppins"].join(","),
  },
  divLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginBottom: "2rem",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "fit-content",
    fontSize: "3vh",
    fontWeight: 500,
    color: `${colors.Black}`,
    fontFamily: ["Poppins"].join(","),
    textDecoration: "none",
    backgroundColor: `${colors.Pink}`,
    transitionDuration: "1s",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `${colors.Red}`,
      color: `${colors.White}`,
    },
  },
  divConnect: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginBottom: "2rem",
  },
  buttonConnect: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15rem",
    height: "5rem",
    backgroundColor: `${colors.White}`,
    border: `5px solid ${colors.Blue}`,
    borderRadius: "5px",
    fontSize: "3vh",
    fontWeight: 500,
    color: `${colors.Black}`,
    fontFamily: ["Poppins"].join(","),
    transitionDuration: "1s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `${colors.Blue}`,
      color: `${colors.White}`,
    },
  },
});
