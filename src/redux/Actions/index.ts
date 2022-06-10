import axios from "axios";
import { OpenSeaPort, Network } from "opensea-js";
import { OrderSide, WyvernSchemaName } from "opensea-js/lib/types";

export let urlBackend = "https://fairviewbackend.herokuapp.com/";

export const GET_COLLECTIONS = "GETCOLLECTIONS";

export const ADD_USER = "ADDUSER";

export const GET_CURRENT_USER = "GETCURRENTUSER";

export const ADD_PICTURE = "ADDPICTURE";

export const ADD_INFORMATION = "ADDINFORMATION";

export const SET_WALLET = "SETWALLET";

export const GET_WALLET = "GETWALLET";

export const LOG_OUT = "LOGOUT";

export const ADD_FAVORITE = "ADDFAVORITE";

export const REMOVE_FAVORITE = "REMOVEFAVORITE";

export const GET_SINGLE_ASSETS = "GETSINGLEASSETS";

export const GET_EVENTS = "GETEVENTS";

export const BUY_NOW = "BUY_NOW";

export const MAKE_OFFER = "MAKE_OFFER";

const API_KEY = process.env.GATSBY_OPENSEA_API_KEY;

console.log("API_KEY", API_KEY);

const options = {
  method: "GET",
  headers: { Accept: "application/json", "X-API-KEY": API_KEY },
};

const getSeaport = async () => {
  const seaport = new OpenSeaPort(
    window.ethereum,
    {
      networkName: Network.Main,
      apiKey: API_KEY,
    },
    (arg) => console.log("HERE ARGS PROVIDER :>>", arg)
  );
  return seaport;
};

export const MAKEOFFER = (
  value: number,
  accountWallet: string,
  assetContractAddress: string,
  assetTokenId: string
) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    try {
      const seaport = await getSeaport();
      const offer = await seaport.createBuyOrder({
        asset: {
          tokenId: assetTokenId,
          tokenAddress: assetContractAddress,
          schemaName: WyvernSchemaName.ERC721,
        },
        accountAddress: accountWallet,
        startAmount: value,
      });
      console.log(offer, "HERE");
      dispatch({ type: MAKE_OFFER, payload: offer });
    } catch (e) {
      console.error(e);
      return e;
    }
  };
};

export const BUYNOW = (
  accountWallet: string,
  assetContractAddress: string,
  assetTokenId: string
) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    try {
      const seaport = await getSeaport();
      const Order = await seaport.api.getOrder({
        asset_contract_address: assetContractAddress,
        token_id: assetTokenId,
        side: OrderSide.Sell,
      });

      const transaction = await seaport.fulfillOrder({
        order: Order,
        accountAddress: accountWallet,
      });
      dispatch({ type: BUY_NOW, payload: transaction });
    } catch (e) {
      console.error(e);
      return e;
    }
  };
};

export const SETWALLET = (wallet: string, balance: any) => {
  return  (dispatch: (arg0: { type: string; payload: any }) => void) => {
     localStorage.setItem("connect", "true");
     localStorage.setItem("wallet", wallet);
     localStorage.setItem("balance", balance);
    dispatch({ type: SET_WALLET, payload: wallet });
  };
};

export const GETWALLET = () => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const wallet =  localStorage.getItem("wallet") || "";
    const balance =  localStorage.getItem("balance") || "";
    let data = { wallet: wallet, balance: balance };
    dispatch({ type: GET_WALLET, payload: data });
  };
};

export const LOGOUT = () => {
  return async (dispatch: (arg0: { type: string }) => void) => {
    await localStorage.removeItem("connect");
    await localStorage.removeItem("wallet");
    await localStorage.removeItem("balance");
    if (localStorage.getItem("connect") && localStorage.getItem("wallet")) {
      await localStorage.removeItem("connect");
      await localStorage.removeItem("wallet");
      await localStorage.removeItem("balance");
    }
    dispatch({ type: LOG_OUT });
  };
};
export const GETCOLLECTIONS = (limit: string) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const Response = await fetch(
      `https://api.opensea.io/api/v1/assets?limit=${limit}&collection=grifters-by-xcopy`,
      options
    );
    const data = await Response.json();
    dispatch({ type: GET_COLLECTIONS, payload: data });
  };
};

export const GETSINGLEASSETS = (assets: string, id: any) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const Response = await fetch(
      `https://api.opensea.io/api/v1/asset/${assets}/${id}/?include_orders=false`,
      options
    );
    const data = await Response.json();
    dispatch({ type: GET_SINGLE_ASSETS, payload: data });
  };
};

export const GETEVENTS = (assets: string, id: any) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const Response = await fetch(
      `https://api.opensea.io/api/v1/events?token_id=${id}&asset_contract_address=${assets}`,
      options
    );
    const data = await Response.json();
    dispatch({ type: GET_EVENTS, payload: data });
  };
};

export const GETCURRENTUSER = (address: string | null) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    return await axios
      .post(urlBackend + "getUser", { address: address })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_CURRENT_USER, payload: data });
      });
  };
};

export const ADDUSER = (address: string) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    return await axios
      .post(urlBackend + "adduser", { address: address })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: ADD_USER, payload: data });
      });
  };
};

export const ADDPICTURE = (address: string, pictureUrl: string) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    return await axios
      .post(urlBackend + "addpicture", {
        address: address,
        pictureUrl: pictureUrl,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: ADD_USER, payload: data });
      });
  };
};

export const ADDINFORMATION = (
  address: string,
  name: string,
  email: string
) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    return await axios
      .post(urlBackend + "addinformation", {
        address: address,
        name: name,
        email: email,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: ADD_INFORMATION, payload: data });
      });
  };
};

export const ADDFAVORITE = (
  address: string,
  addressNFT: string,
  nameNFT: string,
  pictureNFT: string,
  idNFT: number,
  descriptionNFT: string
) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    return await axios
      .post(urlBackend + "addfavorite", {
        address: address,
        addressNFT: addressNFT,
        nameNFT: nameNFT,
        pictureNFT: pictureNFT,
        idNFT: idNFT,
        descriptionNFT: descriptionNFT,
      })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: ADD_FAVORITE, payload: data });
      });
  };
};

export const REMOVEFAVORITE = (address: string, idNFT: number) => {
  return async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    return await axios
      .post(urlBackend + "removefavorite", { address: address, idNFT: idNFT })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: REMOVE_FAVORITE, payload: data });
      });
  };
};
