import React, { useEffect, useState } from "react";
import { colors } from "../../utils/colors";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  GETCOLLECTIONS,
  GETCURRENTUSER,
  GETWALLET,
  ADDFAVORITE,
  REMOVEFAVORITE,
} from "../../redux/Actions";
import toast from "react-hot-toast";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import { Next } from "@styled-icons/fluentui-system-filled/Next";
import { Previous } from "@styled-icons/fluentui-system-filled/Previous";
import { Heart } from "@styled-icons/icomoon/Heart";
import { HeartBroken } from "@styled-icons/icomoon/HeartBroken";

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

  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  const dataSelector = useSelector((state: any) => state);

  let collections = dataSelector?.fairview?.collections?.assets;

  const wallet = dataSelector?.fairview?.wallet;

  let user = dataSelector?.fairview?.currentUser;

  const [limit, setLimit] = useState("50");

  const [range, setRange] = useState({
    bottom: 0,
    top: 10,
  });

  useEffect(() => {
    const getCollections = async () => {
      await dispatch(GETCOLLECTIONS(limit));
    };
    const getUser = async () => {
      await dispatch(GETWALLET());
      await dispatch(GETCURRENTUSER(wallet.wallet));
    };
    getUser();
    getCollections();
  }, [update]);

  const handlePaginateMore = () => {
    if (range.top < collections.length) {
      setRange({
        bottom: range.bottom + 10,
        top: range.top + 10,
      });
    } else {
      return;
    }
  };

  const handlePaginateLess = () => {
    if (range.bottom > 0) {
      setRange({
        bottom: range.bottom - 10,
        top: range.top - 10,
      });
    } else {
      return;
    }
  };

  const handleAddFavorite = async (
    addressNFT: string,
    nameNFT: string,
    pictureNFT: string,
    idNFT: number,
    descriptionNFT: string
  ) => {
    if (!wallet.wallet) {
      return toast.error("Please login to add favorite");
    }
    await dispatch(
      ADDFAVORITE(
        wallet.wallet,
        addressNFT,
        nameNFT,
        pictureNFT,
        idNFT,
        descriptionNFT
      )
    );
    await dispatch(GETCURRENTUSER(wallet.wallet));
    toast.success("Added to favorites");
    await setUpdate(!update);
  };

  const handleRemoveFavorite = async (idNFT: number) => {
    await dispatch(REMOVEFAVORITE(wallet.wallet, idNFT));
    await dispatch(GETCURRENTUSER(wallet.wallet));
    toast.success("Removed from favorites");
    await setUpdate(!update);
  };

  return (
    <div className={classes.root}>
      <div className={classes.divTitle}>
        <Reveal className={classes.reveal} keyframes={customAnimation}>
          <h3 className={classes.title}>Our Collections</h3>
        </Reveal>
        <Reveal className={classes.reveal} keyframes={customAnimation}>
          <div className={classes.divPaginate}>
            <button
              type="button"
              onClick={handlePaginateLess}
              className={classes.buttonPaginate}
            >
              <Previous className={classes.iconPaginate} />
            </button>
            <h5 className={classes.textPaginate}>
              {range.bottom}-{range.top}
            </h5>
            <button
              type="button"
              onClick={handlePaginateMore}
              className={classes.buttonPaginate}
            >
              <Next className={classes.iconPaginate} />
            </button>
          </div>
        </Reveal>
        <div className={classes.divWrapper}>
          {collections
            ?.slice(range.bottom, range.top)
            ?.map((collection: any) => (
              <div className={classes.divCard} key={collection.id}>
                <div className={classes.divButtonHeart}>
                  {user?.idFavorite?.includes(collection.token_id) ? (
                    <button
                      onClick={() => handleRemoveFavorite(collection.token_id)}
                      type="button"
                      className={classes.buttonHeart}
                    >
                      <Heart className={classes.iconHeart} />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddFavorite(
                          collection.asset_contract.address,
                          collection.name,
                          collection.image_url,
                          collection.token_id,
                          collection.description
                        )
                      }
                      type="button"
                      className={classes.buttonHeart}
                    >
                      <HeartBroken className={classes.iconHeart} />
                    </button>
                  )}
                </div>
                <div className={classes.divImage}>
                  <img className={classes.image} src={collection.image_url} />
                </div>
                <div className={classes.divName}>
                  <h5 className={classes.name}>{collection.name}</h5>
                </div>
                <div className={classes.divDescription}>
                  <p className={classes.description}>
                    {collection.description}
                  </p>
                </div>
                <div className={classes.divButton}>
                  <a
                    className={classes.buttonSeeMore}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noreferrer"
                    href={`http://localhost:8000/single?assets=${collection.asset_contract.address}&id=${collection.token_id}`}
                  >
                    See More
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
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
    marginBottom: `2rem`,
  },
  divTitle: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    textAlign: `center`,
    marginBottom: `2rem`,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    fontSize: "3vh",
    margin: 0,
    fontWeight: 900,
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
  },
  reveal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
  },
  divPaginate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "3rem",
    marginBottom: "3rem",
  },
  buttonPaginate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    backgroundColor: colors.White,
    border: "transparent",
    boxShadow: "none",
    outline: "none",
    color: colors.Black,
    transitionDuration: "1s",
    "&:hover": {
      backgroundColor: colors.Black,
      color: colors.White,
      cursor: "pointer",
    },
  },
  iconPaginate: {
    width: "2.5rem",
    height: "2.5rem",
  },
  textPaginate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5vh",
    fontWeight: 900,
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
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
    backgroundColor: "transparent",
    border: "transparent",
    boxShadow: "none",
    outline: "none",
    color: colors.Red,
    marginRight: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
    transitionDuration: "1s",
    "&:hover": {
      backgroundColor: colors.Red,
      color: colors.White,
      cursor: "pointer",
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
  },
});
