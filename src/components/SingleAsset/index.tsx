import React, { useEffect, useState, Fragment } from "react";
import { colors } from "../../utils/colors";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getDays, toETH, toUSD, secondsToDays } from "./utilsSingle";
import {
  GETSINGLEASSETS,
  GETCURRENTUSER,
  GETWALLET,
  ADDFAVORITE,
  REMOVEFAVORITE,
  GETEVENTS,
  BUYNOW,
  MAKEOFFER,
} from "../../redux/Actions";
import toast from "react-hot-toast";
import { Heart } from "@styled-icons/icomoon/Heart";
import { HeartBroken } from "@styled-icons/icomoon/HeartBroken";
import { Ethereum } from "@styled-icons/fa-brands/Ethereum";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

export default function LandPage(props: any): JSX.Element {
  const isBrowser = typeof window !== "undefined";

  const { activateBrowserWallet, account } = useEthers();

  let queryParams: any;

  if (isBrowser) {
    queryParams = new URLSearchParams(window.location.search);
  }

  const [valueOffer, setValueOffer] = useState<any>(0);

  const classes = useStyles();

  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  const assets = (queryParams && queryParams.get("assets")) || "";

  const id = (queryParams && queryParams.get("id")) || "";

  const dataSelector = useSelector((state: any) => state);

  const wallet = dataSelector?.fairview?.wallet;

  let user = dataSelector?.fairview?.currentUser;

  const [showInput, setShowInput] = useState(false);

  const singleAsset = dataSelector?.fairview?.singleAsset;

  const events = dataSelector?.fairview?.events;

  let isBuyNow = false;

  let hasOffer = false;

  let currentOffer: any = [];

  let currentPrice: any = null;

  let currentPriceUSD: any = null;

  if (events?.asset_events?.length > 0) {
    events?.asset_events?.map((event: any) => {
      if (event.duration !== null) {
        if (
          event?.event_type === "created" &&
          event?.ending_price === event?.starting_price &&
          getDays(Date.now(), event.created_date) < 7 &&
          secondsToDays(event.duration) -
            getDays(Date.now(), event.created_date) >
            0
        ) {
          isBuyNow = true;
          currentPrice = toETH(event.ending_price);
          currentPriceUSD = toUSD(
            event.payment_token?.usd_price * currentPrice
          );
          return;
        }
      } else if (
        event?.event_type === "created" &&
        event?.ending_price === event?.starting_price &&
        getDays(Date.now(), event.created_date) < 7
      ) {
        isBuyNow = true;
        currentPrice = toETH(event.ending_price);
        currentPriceUSD = toUSD(event.payment_token?.usd_price * currentPrice);
      }
    });

    events?.asset_events?.map((item: any) => {
      if (
        item.event_type === "offer_entered" &&
        getDays(Date.now(), item.created_date) < 30
      ) {
        currentOffer.push(item);
        hasOffer = true;
        return;
      }
    });
  }

  useEffect(() => {
    const getData = async () => {
      await dispatch(GETWALLET());
      await dispatch(GETCURRENTUSER(wallet.wallet));
      await dispatch(GETSINGLEASSETS(assets, id));
      await dispatch(GETEVENTS(assets, id));
    };
    getData();
  }, [update]);

  const handleAddFavorite = async (
    addressNFT: string,
    nameNFT: string,
    pictureNFT: string,
    idNFT: number,
    descriptionNFT: string
  ) => {
    if (!wallet) {
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

  const handleBuyNow = async () => {
    activateBrowserWallet();
    await dispatch(BUYNOW(wallet.wallet, assets, id));
    await dispatch(GETCURRENTUSER(wallet.wallet));
    await dispatch(GETSINGLEASSETS(assets, id));
    await dispatch(GETEVENTS(assets, id));
    toast.success("You have successfully bought this NFT");
  };

  const handleMakeOffer = async () => {
    activateBrowserWallet();
    await dispatch(MAKEOFFER(valueOffer, wallet.wallet, assets, id));
    await dispatch(GETCURRENTUSER(wallet.wallet));
    await dispatch(GETSINGLEASSETS(assets, id));
    await dispatch(GETEVENTS(assets, id));
    toast.success("Offer sent");
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <img
            className={classes.image}
            src={singleAsset.image_url}
            alt="assets"
          />
        </div>
        <div className={classes.headerRight}>
          <div className={classes.divButtonHeart}>
            {user?.idFavorite?.includes(singleAsset.token_id) ? (
              <button
                onClick={() => handleRemoveFavorite(singleAsset.id)}
                type="button"
                className={classes.buttonHeart}
              >
                <Heart className={classes.iconHeart} />
              </button>
            ) : (
              <button
                onClick={() =>
                  handleAddFavorite(
                    singleAsset.asset_contract.address,
                    singleAsset.name,
                    singleAsset.image_url,
                    singleAsset.token_id,
                    singleAsset.description
                  )
                }
                type="button"
                className={classes.buttonHeart}
              >
                <HeartBroken className={classes.iconHeart} />
              </button>
            )}
          </div>
          <h3 className={classes.title}>{singleAsset.name}</h3>
          <p className={classes.description}>{singleAsset.description}</p>
          <a
            className={classes.descriptionLinks}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
            href={`https://opensea.io/${singleAsset?.owner?.user?.username}`}
          >
            Owned by {singleAsset?.owner?.user?.username}
          </a>
          <a
            className={classes.descriptionLinks}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
            href={`https://opensea.io/collection/${singleAsset?.collection?.slug}`}
          >
            Collection {singleAsset?.collection?.name}
          </a>
          <a
            className={classes.descriptionLinks}
            style={{ textDecoration: "none" }}
            target="_blank"
            rel="noreferrer"
            href={`https://opensea.io/${singleAsset?.creator?.user?.username}`}
          >
            Creator {singleAsset?.creator?.user?.username}
          </a>
          {isBuyNow ? (
            <div className={classes.divPrice}>
              <p className={classes.description}>
                Price in Ethereum :{" "}
                <Ethereum className={classes.iconEthereum} /> {currentPrice}
              </p>
              <p className={classes.description}>
                Price in USD : {currentPriceUSD}
              </p>
            </div>
          ) : null}
          {hasOffer ? (
            <div className={classes.divOffers}>
              <p className={classes.description}>
                This NFT has offers in the last 30 days
              </p>
              {currentOffer &&
                currentOffer.map((item: any) => (
                  <div key={item.id} className={classes.divOffer}>
                    <p className={classes.descriptionOffer}>
                      From: {item.from_account.user.username}
                    </p>
                    <p className={classes.descriptionOffer}>
                      Amount: <Ethereum className={classes.iconEthereum} />{" "}
                      {toETH(item.bid_amount)}
                    </p>
                  </div>
                ))}
            </div>
          ) : null}
          <div className={classes.divOffers}>
            <p className={classes.description}>Your information</p>
            <div className={classes.divOffer}>
              <p className={classes.descriptionOffer}>
                Wallet: {wallet.wallet}
              </p>
              <p className={classes.descriptionOffer}>
                Balance: <Ethereum className={classes.iconEthereum} />{" "}
                {wallet.balance && formatEther(wallet.balance).slice(0, 6)}
              </p>
            </div>
          </div>
          <div className={classes.divButtons}>
            {isBuyNow ? (
              <Fragment>
                {wallet.balance &&
                formatEther(wallet.balance) < currentPrice ? (
                  <button
                    type="button"
                    onClick={() => toast.error("Not enough ETH")}
                    className={classes.buttonDisabled}
                  >
                    BUY NOW
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    type="button"
                    className={classes.button}
                  >
                    BUY NOW
                  </button>
                )}
              </Fragment>
            ) : null}
            <button
              type="button"
              onClick={() => setShowInput(!showInput)}
              className={classes.button}
            >
              MAKE AN OFFER
            </button>
          </div>
          {showInput ? (
            <div className={classes.divInput}>
              <input
                type="number"
                className={classes.input}
                placeholder="Enter the amount in ETH"
                value={valueOffer}
                onChange={(e) => setValueOffer(e.target.value)}
              />
              <button
                onClick={handleMakeOffer}
                type="button"
                className={classes.button}
              >
                OFFER
              </button>
            </div>
          ) : null}
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
  header: {
    display: "flex",
    width: "90%",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `space-around`,
    flexDirection: `row`,
    textAlign: `center`,
    marginBottom: `3rem`,
    "@media (max-width: 1280px)": {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  headerLeft: {
    display: "flex",
    width: "40%",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `flex-start`,
    flexDirection: `column`,
    textAlign: `left`,
    animation: `$scale-in-center 1s`,
    "@media (max-width: 1280px)": {
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2rem",
    },
  },
  headerRight: {
    display: "flex",
    width: "35%",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `flex-start`,
    flexDirection: `column`,
    textAlign: `left`,
    borderRadius: "5px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    boxShadow: " 0px 0px 30px 0px rgba(0,0,0,0.35)",
    backgroundColor: colors.White,
    animation: `$scale-in-center 1s`,
    "@media (max-width: 1280px)": {
      width: "85%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "2rem",
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
    marginTop: "0.5rem",
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
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    objectFit: `cover`,
    objectPosition: `center`,
    boxShadow: " 0px 0px 30px 0px rgba(0,0,0,0.35)",
  },
  title: {
    display: "flex",
    width: "100%",
    margin: 0,
    fontSize: "4vh",
    fontWeight: 900,
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
    marginTop: "0rem",
    marginBottom: "2rem",
    "@media (max-width: 1280px)": {
      fontSize: "3vh",
    },
  },
  description: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 0,
    fontSize: "2.5vh",
    fontWeight: 900,
    textDecoration: "none",
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
    marginBottom: "1rem",
    "@media (max-width: 1280px)": {
      fontSize: "1.5vh",
    },
  },
  descriptionLinks: {
    display: "flex",
    width: "100%",
    margin: 0,
    fontSize: "2.5vh",
    fontWeight: 900,
    textDecoration: "none",
    fontFamily: ["Poppins"].join(","),
    color: colors.Red,
    marginBottom: "1rem",
    "@media (max-width: 1280px)": {
      fontSize: "1.5vh",
    },
  },
  divPrice: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `flex-start`,
    flexDirection: `column`,
    textAlign: `left`,
  },
  iconEthereum: {
    width: "1rem",
    height: "1rem",
    marginRight: "0.1rem",
  },
  divOffers: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `flex-start`,
    flexDirection: `column`,
    textAlign: `left`,
    paddingTop: "1rem",
    borderTop: `2px solid ${colors.Red}`,
  },
  divOffer: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `flex-start`,
    justifyContent: `flex-start`,
    flexDirection: `column`,
    textAlign: `left`,
    paddingTop: "1rem",
    marginBottom: "1rem",
    borderTop: `2px solid ${colors.Blue}`,
    borderBottom: `2px solid ${colors.Blue}`,
  },
  descriptionOffer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 0,
    fontSize: "2vh",
    fontWeight: 900,
    textDecoration: "none",
    fontFamily: ["Poppins"].join(","),
    color: colors.Black,
    marginBottom: "1rem",
    "@media (max-width: 1280px)": {
      fontSize: "1.5vh",
    },
  },
  divButtons: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `center`,
    justifyContent: `space-around`,
    flexDirection: `row`,
    textAlign: `center`,
    marginTop: "2rem",
    marginBottom: "2rem",
    "@media (max-width: 1280px)": {
      flexDirection: `column`,
      justifyContent: `center`,
    },
  },
  buttonDisabled: {
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
    opacity: 0.5,
    color: `${colors.Black}`,
    transitionDuration: "1s",
    "&:hover": {
      cursor: "pointer",
    },
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
      border: `5px solid ${colors.Red}`,
    },
  },
  divInput: {
    display: "flex",
    width: "100%",
    height: `fit-content`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    textAlign: `left`,
    paddingTop: "1rem",
    marginBottom: "2rem",
    borderTop: `2px solid ${colors.Red}`,
    animation: `$scale-in-center 1s`,
  },
  input: {
    display: "flex",
    width: "60%",
    height: "2rem",
    fontWeight: 900,
    fontFamily: ["Poppins", "sans-serif"].join(","),
    margin: 0,
    fontSize: `2vh`,
    borderRadius: "5px",
    marginBottom: "1rem",
    color: `${colors.Black}`,
    backgroundColor: `${colors.White}`,
    border: `2px solid ${colors.Black}`,
    "@media (max-width: 1280px)": {
      width: "100%",
      fontSize: `1.5vh`,
    },
  },
});
