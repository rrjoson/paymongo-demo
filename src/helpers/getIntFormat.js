import currency from "currency.js";

/**
 * @param {string} price - Price in peso format
 * @returns {string} - Price in integer format
 */
const getIntFormat = price => currency(price).intValue;

export default getIntFormat;
