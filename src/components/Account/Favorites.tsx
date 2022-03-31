import React, { useEffect, useState, Fragment } from "react";
import { colors } from "../../utils/colors";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { GETCURRENTUSER, GETWALLET, REMOVEFAVORITE } from "../../redux/Actions";
import { Heart } from "@styled-icons/icomoon/Heart";
import toast from "react-hot-toast";

export default function Favorites(props: any): JSX.Element {
  const classes = useStyles();

  const dispatch = useDispatch();

  const dataSelector = useSelector((state: any) => state);

  const wallet = dataSelector?.fairview?.wallet;

  const user = dataSelector?.fairview?.currentUser;

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      await dispatch(GETWALLET());
      await dispatch(GETCURRENTUSER(wallet.wallet));
    };
    getUser();
  }, [update, wallet.wallet]);

  const handleRemoveFavorite = async (idNFT: number) => {
    await dispatch(REMOVEFAVORITE(wallet.wallet, idNFT));
    await dispatch(GETCURRENTUSER(wallet.wallet));
    toast.success("Removed from favorites");
    await setUpdate(!update);
  }


  return (
    <div className={classes.root}>
      <div className={classes.divTitle}>
        <h3 className={classes.title}>Favorites</h3>
      </div>
      <div className={classes.divWrapper}>
        {user?.favorites?.map((item: any) => (
          <div className={classes.divCard} key={item.idNFT}>
            <div className={classes.divButtonHeart}>
              <button
                onClick={() => handleRemoveFavorite(item.idNFT)}
                type="button" className={classes.buttonHeart}>
                <Heart className={classes.iconHeart} />
              </button>
            </div>
            <div className={classes.divImage}>
                <img className={classes.image} src={item.pictureNFT} />
              </div>
              <div className={classes.divName}>
                  <h5 className={classes.name}>{item.nameNFT}</h5>
                </div>
              <div className={classes.divDescription}>
                <p className={classes.description}>{item.descriptionNFT}</p>
              </div>
              <div className={classes.divButton}>
                <a
                  className={classes.buttonSeeMore}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://fairviewgallery.netlify.app/single?assets=${item.addressNFT}&id=${item.idNFT}`}
                >
                  See More
                </a>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
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
  },
  divTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  title: {
    display: "flex",
    alignItems: "flex-start",
    fontWeight: 900,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    margin: 0,
    fontSize: `3vh`,
    color: `${colors.Black}`,
  },
  boxFavorites: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    flexWrap: "wrap",
  },
  divWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
    "@media (max-width: 1280px)": {
      flexDirection: "column",
    },
  },
  divCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    height: "fit-content",
    margin: "1rem",
    padding: "1rem",
    borderRadius: "5px",
    backgroundColor: colors.White,
    boxShadow: " 0px 0px 30px 0px rgba(0,0,0,0.35)",
    animation: `$scale-in-center 1s`,
    "@media (max-width: 1280px)": {
      width: "80%",
      margin: "0",
      marginBottom: "1rem",
      marginTop: "1rem",
    },
  },
  "@keyframes scale-in-center": {
    "0%": {
      opacity: 0,
      transform: "scale(0)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  divButtonHeart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    height: "fit-content",
  },
  buttonHeart: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    backgroundColor: 'transparent',
    border: 'transparent',
    boxShadow: 'none',
    outline: 'none',
    color: colors.Red,
    marginRight: "0.5rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    transitionDuration: "1s",
    '&:hover': {
      backgroundColor: colors.Red,
      color: colors.White,
      cursor: 'pointer',
    },
  },
  iconHeart: {
    width: "2.5rem",
    height: "2.5rem",
  },
  divImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "fit-content",
    marginBottom: "2rem",
  },
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    objectFit: `cover`,
    objectPosition: `center`,
  },
  divName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: "2rem",
  },
  name: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    margin: 0,
    fontSize: "2.5vh",
    fontWeight: 900,
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
  },
  divDescription: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: "2rem",
  },
  description: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    fontSize: "1.5vh",
    fontWeight: 500,
    margin: 0,
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
  },
  divButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "fit-content",
    marginBottom: "2rem",
  },
  buttonSeeMore: {
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
      border: `5px solid ${colors.Red}`,
    },
  }
});
