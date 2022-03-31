import { Mainnet } from "@usedapp/core";
import Web3 from "web3";
export const getDays = (dateOne: any, dateTwo: any) => {
  const one = new Date(dateOne);

  const two = new Date(dateTwo);

  let time = one.getTime() - two.getTime();

  let difference = time / (1000 * 3600 * 24);

  return difference;
};

export const toETH = (wei: any) => {
  const etherValue = Web3.utils.fromWei(wei, "ether");
  return etherValue;
};

export const toDecimals = (number: any, decimals = 2) => {
  if (number === NaN) {
    return "—";
  }
  let [integral, fractional] = String(number).split(".");
  integral.length === 1 && (integral = "0" + integral);
  if (fractional === undefined) {
    fractional = "00";
  } else if (fractional.length === 1) {
    fractional = fractional + "0";
  } else {
    fractional.length > decimals && (fractional = fractional.slice(0, 2));
  }
  return `${integral}.${fractional}`;
};

export const toNumberWithDecimals = (integer: any) => {
  const [integral = "0", fractional = "0"] = integer.toString().split(".");
  const integral_with_commas = integral.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  const padded_fractional =
    fractional.length === 1 ? `0${fractional}` : fractional;
  return [integral_with_commas, padded_fractional].join(".");
};

export const toUSD = (number: any) => {
  if (number == NaN) {
    return "—";
  }
  return `$${toNumberWithDecimals(toDecimals(number, 2))}`;
};

export const secondsToDays = (number: any) => {
  if (!number) {
    return 0;
  }
  return Math.floor(number / (60 * 60 * 24));
};

