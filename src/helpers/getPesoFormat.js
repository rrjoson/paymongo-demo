import currency from "currency.js";

/**
 * @param {number} price - Price in integer format
 * @returns {string} - Price in peso format
 */
const getPesoFormat = price =>
  currency((price / 100).toFixed(2), {
    symbol: "₱",
    decimal: ".",
    separator: ","
  }).format(true);

export default getPesoFormat;
