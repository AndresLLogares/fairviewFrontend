import React, { useEffect, useState, Fragment } from "react";
import { colors } from "../../utils/colors";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import Loading from "../Loading";
import {
  GETCURRENTUSER,
  ADDPICTURE,
  ADDINFORMATION,
  GETWALLET,
  LOGOUT,
} from "../../redux/Actions";
import axios from "axios";
import toast from "react-hot-toast";
import Favorite from "./Favorites";
import { useEthers } from "@usedapp/core";

const customAnimation = keyframes`
  from {
    transform: rotateX(80deg);
    opacity: 0;
  }
 to{
    transform: rotateX(0);
    opacity: 1;
  }`;

export default function Account(props: any): JSX.Element {
  const isBrowser = typeof window !== "undefined";

  const { deactivate } = useEthers();

  const [information, setInformation] = useState({
    name: "",
    email: "",
  });

  const [data, setData] = useState({
    CLOUDINARY_URL: "",
    CLOUDINARY_PRESET: "",
  });

  const [update, setUpdate] = useState(false);

  const classes = useStyles();

  const dispatch = useDispatch();

  const dataSelector = useSelector((state: any) => state);

  const wallet = dataSelector?.fairview?.wallet;

  const user = dataSelector?.fairview?.currentUser;

  if (!wallet.wallet && isBrowser) {
    window.location.href = "/";
  }

  useEffect(() => {
    const getUser = async () => {
      await dispatch(GETWALLET());
      await dispatch(GETCURRENTUSER(wallet.wallet));
    };
    const fetchData = async () => {
      setData({
        CLOUDINARY_URL: process.env.GATSBY_CLOUDINARY_URL as string,
        CLOUDINARY_PRESET: process.env.GATSBY_CLOUDINARY_PRESET as string,
      });
    };
    fetchData();
    getUser();
  }, [update]);

  const handleInputFile = () => {
    document!.getElementById("file")!.click();
  };

  const HandleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event!.currentTarget!.files![0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", data.CLOUDINARY_PRESET);

    const res = await axios.post(data.CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await dispatch(ADDPICTURE(wallet.wallet, res.data.secure_url));
    await dispatch(GETCURRENTUSER(wallet.wallet));
    toast.success("Image uploaded successfully");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (information.name === "" || information.email === "") {
      toast.error("Please fill all fields");
    }
    await dispatch(
      ADDINFORMATION(wallet.wallet, information.name, information.email)
    );
    await dispatch(GETCURRENTUSER(wallet.wallet));
    setUpdate(!update);
    setInformation({
      name: "",
      email: "",
    });
    toast.success("Information updated successfully");
  };

  const handleLogout = async () => {
    await deactivate();
    await dispatch(LOGOUT());
    await dispatch(GETWALLET());
    if (isBrowser) {
      window.location.href = "/";
    }
  };

  return (
    <div className={classes.root}>
      {!user ? (
        <Loading />
      ) : (
        <Fragment>
          <Reveal className={classes.reveal} keyframes={customAnimation}>
            <div className={classes.divTitle}>
              <h3 className={classes.title}>Information</h3>
            </div>
          </Reveal>
          <Reveal className={classes.reveal} keyframes={customAnimation}>
            <div className={classes.twoColumns}>
              <div className={classes.column}>
                <div className={classes.divPicture}>
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="avatar"
                      className={classes.picture}
                    />
                  ) : (
                    <p className={classes.eachInfo}>Picture</p>
                  )}
                </div>
                <p className={classes.eachInfo}>Metamask: {user.address}</p>
                <p className={classes.eachInfo}>Full name: {user.name}</p>
                <p className={classes.eachInfo}>Email: {user.email}</p>
                <a
                  className={classes.button}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://etherscan.io/address/${user.address}`}
                >
                  See Your Etherscan
                </a>
              </div>
              <div className={classes.secondColumn}>
                <p className={classes.eachInfo}>Edit information</p>
                <div className={classes.divButton}>
                  <button
                    onClick={handleInputFile}
                    type="button"
                    className={classes.button}
                  >
                    Add Picture
                  </button>
                  <input
                    onChange={HandleImage}
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    name="file"
                  />
                </div>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <div className={classes.eachInput}>
                    <label className={classes.label}>Full name</label>
                    <input
                      className={classes.input}
                      type="text"
                      name="name"
                      value={information.name}
                      onChange={(e) =>
                        setInformation({ ...information, name: e.target.value })
                      }
                    />
                  </div>
                  <div className={classes.eachInput}>
                    <label className={classes.label}>Email</label>
                    <input
                      className={classes.input}
                      type="text"
                      name="email"
                      value={information.email}
                      onChange={(e) =>
                        setInformation({
                          ...information,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={classes.divButton}>
                    <button type="submit" className={classes.button}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
          <Favorite />
          <Reveal className={classes.reveal} keyframes={customAnimation}>
            <div className={classes.divLogOut}>
              <button
                type="button"
                onClick={handleLogout}
                className={classes.buttonLogOut}
              >
                Log out
              </button>
            </div>
          </Reveal>
        </Fragment>
      )}
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
  divTitle: {
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
  twoColumns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: "1rem",
    backgroundColor: `${colors.White}`,
    backgroundImage: `repeating-linear-gradient(45deg, #F7FFF7 25%, transparent 25%, transparent 75%, 
      #F7FFF7 75%, #F7FFF7), repeating-linear-gradient(45deg, #F7FFF7 25%, #ffffff 25%, #ffffff 75%, #F7FFF7 75%, #F7FFF7)`,
    backgroundPosition: `0 0, 10px 10px`,
    backgroundSize: `20px 20px`,
    border: `2px solid ${colors.Blue}`,
    borderRadius: "5px",
    marginBottom: "3rem",
    "@media (max-width: 1280px)": {
      flexDirection: "column",
    },
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    width: "45%",
    padding: "0.5rem",
    "@media (max-width: 1280px)": {
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
    },
  },
  secondColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    width: "45%",
    padding: "0.5rem",
    "@media (max-width: 1280px)": {
      alignItems: "center",
      width: "100%",
      justifyContent: "center",
    },
  },
  divPicture: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.White}`,
    alignSelf: "center",
    width: "30%",
    height: "10rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: "5px",
    border: `2px solid ${colors.Blue}`,
  },
  picture: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    objectFit: `cover`,
    objectPosition: `center`,
  },
  eachInfo: {
    display: "flex",
    flexDirection: "row",
    fontWeight: 900,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    margin: 0,
    fontSize: `2.5vh`,
    textDecoration: "none",
    color: `${colors.Black}`,
    marginTop: "1rem",
    marginBottom: "1rem",
    "@media (max-width: 1280px)": {
      alignItems: "center",
      justifyContent: "center",
      fontSize: `1.5vh`,
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    "@media (max-width: 1280px)": {
      width: "100%",
    },
  },
  eachInput: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    marginBottom: "1rem",
    "@media (max-width: 1280px)": {
      width: "80%",
    },
  },
  label: {
    display: "flex",
    alignSelf: "flex-start",
    fontWeight: 900,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    margin: 0,
    color: `${colors.Black}`,
    marginBottom: "1rem",
    fontSize: `2vh`,
    "@media (max-width: 1280px)": {
      fontSize: `1.5vh`,
    },
  },
  input: {
    display: "flex",
    width: "100%",
    height: "2rem",
    fontWeight: 900,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    margin: 0,
    fontSize: `2vh`,
    borderRadius: "5px",
    color: `${colors.Black}`,
    backgroundColor: `${colors.White}`,
    border: `2px solid ${colors.Black}`,
    "@media (max-width: 1280px)": {
      width: "100%",
      fontSize: `1.5vh`,
    },
  },
  divButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    marginBottom: "1rem",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15rem",
    height: "3rem",
    fontFamily: ["Poppins", "sans-serif"].join(","),
    backgroundColor: `${colors.White}`,
    border: `2px solid ${colors.Blue}`,
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "2vh",
    fontWeight: 900,
    color: `${colors.Black}`,
    transitionDuration: "1s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `${colors.Red}`,
      color: `${colors.White}`,
      border: `transparent`,
    },
  },
  divLogOut: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonLogOut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20rem",
    height: "4rem",
    fontFamily: ["Poppins", "sans-serif"].join(","),
    backgroundColor: `${colors.White}`,
    border: `2px solid ${colors.Blue}`,
    borderRadius: "5px",
    fontSize: "3vh",
    fontWeight: 900,
    color: `${colors.Black}`,
    transitionDuration: "1s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: `${colors.Red}`,
      color: `${colors.White}`,
      border: `transparent`,
    },
  },
});
