import {
  GET_COLLECTIONS,
  GET_CURRENT_USER,
  SET_WALLET,
  GET_WALLET,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  GET_SINGLE_ASSETS,
  GET_EVENTS,
  BUY_NOW,
  MAKE_OFFER,
} from "../Actions";

const initialState = {
  collections: [],
  currentUser: [],
  wallet: "",
  favorites: [],
  singleAsset: [],
  events: [],
  buyNow: [],
  offerResponse: [],
};

const reducers = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  if (action.type === GET_COLLECTIONS) {
    return Object.assign({}, state, {
      collections: action.payload,
    });
  }
  if (action.type === GET_CURRENT_USER) {
    return Object.assign({}, state, {
      currentUser: action.payload,
    });
  }
  if (action.type === SET_WALLET) {
    return Object.assign({}, state, {
      wallet: action.payload,
    });
  }
  if (action.type === GET_WALLET) {
    return Object.assign({}, state, {
      wallet: action.payload,
    });
  }
  if (action.type === ADD_FAVORITE) {
    return Object.assign({}, state, {
      favorites: action.payload,
    });
  }
  if (action.type === REMOVE_FAVORITE) {
    return Object.assign({}, state, {
      favorites: action.payload,
    });
  }
  if (action.type === GET_SINGLE_ASSETS) {
    return Object.assign({}, state, {
      singleAsset: action.payload,
    });
  }
  if (action.type === GET_EVENTS) {
    return Object.assign({}, state, {
      events: action.payload,
    });
  }
  if (action.type === BUY_NOW) {
    return Object.assign({}, state, {
      buyNow: action.payload,
    });
  }
  if (action.type === MAKE_OFFER) {
    return Object.assign({}, state, {
      offerResponse: action.payload,
    });
  }
  return state;
};

export default reducers;
