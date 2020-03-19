import React from "react";
import { WingBlank, WhiteSpace, List, Toast, Flex } from "antd-mobile";
import createPersistedState from "use-persisted-state";
import _ from "lodash";

import getPesoFormat from "../helpers/getPesoFormat";
import products from "../data/products.json";

const useCartState = createPersistedState("cart");

const ProductsPage = () => {
  const [cart, setCart] = useCartState([]);
  const cartData = [...cart];

  return (
    <WingBlank size="lg">
      <WhiteSpace size="lg" />
      <List>
        {products.data.map(product => {
          return (
            <div key={product.id}>
              <List.Item>
                <Flex justify="between" align="center">
                  <div>
                    <div>{product.name}</div>
                    <div>{getPesoFormat(product.price)}</div>
                  </div>
                  <button
                    disabled={_.some(cartData, product)}
                    onClick={() => {
                      cartData.push({
                        ...product,
                        quantity: 1
                      });

                      setCart(cartData);

                      Toast.success(
                        <div>
                          <div>{product.name}</div>
                          <div>Added to cart</div>
                        </div>,
                        1
                      );
                    }}
                  >
                    Add to Cart
                  </button>
                </Flex>
              </List.Item>
            </div>
          );
        })}
      </List>
    </WingBlank>
  );
};

export default ProductsPage;
