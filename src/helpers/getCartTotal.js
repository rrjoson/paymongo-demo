import currency from "currency.js";
import getPesoFormat from "./getPesoFormat";

/**
 * @param {object} cart - Cart object
 * @returns {number} - Total price in integer format
 */
const getCartTotal = cart => {
  let totalPrice = 0;

  const priceList = cart.map(i => getPesoFormat(i.price));
  priceList.forEach(price => {
    totalPrice = currency(totalPrice).add(price);
  });

  return totalPrice.intValue;
};

export default getCartTotal;
