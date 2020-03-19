import React from "react";
import { useHistory } from "react-router-dom";
import { WhiteSpace, WingBlank, Button, List, Flex, Toast } from "antd-mobile";
import createPersistedState from "use-persisted-state";
import _ from "lodash";

import getCartTotal from "../helpers/getCartTotal";
import getPesoFormat from "../helpers/getPesoFormat";

const useCartState = createPersistedState("cart");

const CartPage = () => {
  const [cart, setCart] = useCartState([]);
  const amount = getCartTotal(cart);
  const history = useHistory();

  const cartData = [...cart];

  if (cart.length === 0) {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        Cart is empty. Please add products your cart.
      </WingBlank>
    );
  }

  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <List>
        {cart.map(product => {
          return (
            <div key={product.id}>
              <List.Item>
                <Flex justify="between" align="center">
                  <div>
                    <div>{product.name}</div>
                    <div>{getPesoFormat(product.price)}</div>
                  </div>
                  <button
                    onClick={() => {
                      _.remove(cartData, item => {
                        return item.id === product.id;
                      });

                      setCart(cartData);

                      Toast.success(
                        <div>
                          <div>{product.name}</div>
                          <div>Removed from cart</div>
                        </div>,
                        1
                      );
                    }}
                  >
                    Remove from cart
                  </button>
                </Flex>
              </List.Item>
            </div>
          );
        })}
      </List>

      <WhiteSpace size="lg" />

      <List>
        <List.Item>Total: {getPesoFormat(amount)}</List.Item>
      </List>

      <WhiteSpace size="lg" />

      <Button
        type="primary"
        size="large"
        onClick={() => history.push("/checkout")}
      >
        CHECKOUT
      </Button>
    </WingBlank>
  );
};

export default CartPage;
