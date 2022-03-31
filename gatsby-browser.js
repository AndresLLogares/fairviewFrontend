import React from "react";
import WrapWithProvider from "./src/redux/wrap-with-provider";
import { ChainId, DAppProvider } from "@usedapp/core";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://mainnet.infura.io/v3/655cfb5bb2bb42b2bc96f812738a29f8",
  },
};
export const wrapPageElement = ({ element }) => {
  return (
    <Provider store={store}>
      <DAppProvider config={config}>{element}</DAppProvider>
    </Provider>
  );
};

