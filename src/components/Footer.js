import React from "react";
import { TabBar } from "antd-mobile";
import { useHistory } from "react-router-dom";
import createPersistedState from "use-persisted-state";

const useCartState = createPersistedState("cart");

const data = [
  {
    name: "Products",
    icon: "📦",
    pathname: "/"
  },
  {
    name: "Cart",
    icon: "🛒",
    pathname: "/cart"
  },
  {
    name: "Checkout",
    icon: "💳",
    pathname: "/checkout"
  }
];

const Footer = () => {
  const [cart] = useCartState([]);
  const history = useHistory();

  return (
    <footer
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        maxWidth: "600px",
        margin: "auto"
      }}
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {data.map(item => (
          <TabBar.Item
            title={item.name}
            key={item.name}
            icon={
              <span
                role="img"
                aria-label={item.name}
                style={{
                  fontSize: "22px"
                }}
              >
                {item.icon}
              </span>
            }
            selectedIcon={
              <span
                role="img"
                aria-label={item.name}
                style={{
                  fontSize: "22px"
                }}
              >
                {item.icon}
              </span>
            }
            selected={history.location.pathname === item.pathname}
            onPress={() => {
              history.push(item.pathname);
            }}
            badge={item.name === "Cart" && cart.length}
          />
        ))}
      </TabBar>
    </footer>
  );
};
export default Footer;
