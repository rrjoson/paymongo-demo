import Paymongo from "paymongo";

const paymongo = new Paymongo(process.env.REACT_APP_PAYMONGO_SECRET_KEY);

export default paymongo;
