import React from "react";
import { NavBar } from "antd-mobile";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  return (
    <NavBar mode="dark">
      {history.location.pathname.toUpperCase().split("/")[1] || "PAYMONGO DEMO"}
    </NavBar>
  );
};
export default Header;
