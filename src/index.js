import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";

import "antd-mobile/dist/antd-mobile.css";
import "./styles.css";

ReactDOM.render(
  <Router>
    <Header />
    <Switch>
      <Route exact path="/">
        <ProductsPage />
      </Route>
      <Route path="/cart">
        <CartPage />
      </Route>
      <Route path="/checkout">
        <CheckoutPage />
      </Route>
    </Switch>
    <Footer />
  </Router>,
  document.getElementById("root")
);
