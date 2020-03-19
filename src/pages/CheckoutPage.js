import React, { useState, useEffect } from "react";
import { WingBlank, WhiteSpace, Icon, Flex, Card, Toast } from "antd-mobile";
import { useHistory } from "react-router-dom";
import createPersistedState from "use-persisted-state";
import _ from "lodash";

import paymongo from "../services/paymongo";
import getCartTotal from "../helpers/getCartTotal";
import getPesoFormat from "../helpers/getPesoFormat";
import CheckoutForm from "../components/CheckoutForm";

const useCartState = createPersistedState("cart");

const PaymentPage = () => {
  const [cart, setCart] = useCartState([]);
  const [loading, setLoading] = useState(false);

  const [paymentReferenceId, setPaymentReferenceId] = useState("");
  const [paidAmount, setPaidAmount] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setPaymentReferenceId("");
  }, [history.location.pathname]);

  const handlePay = async ({
    name,
    email,
    cardNumber,
    cardExpiry,
    cardCvc
  }) => {
    setLoading(true);

    try {
      const token = await paymongo.createToken({
        data: {
          attributes: {
            number: cardNumber,
            exp_month: parseInt(cardExpiry.split("/")[0]),
            exp_year: parseInt(cardExpiry.split("/")[1]),
            cvc: cardCvc
          }
        }
      });

      const payment = await paymongo.createPayment({
        data: {
          attributes: {
            amount: getCartTotal(cart),
            currency: "PHP",
            billing: {
              name: name,
              email: email
            },
            source: {
              id: token.data.id,
              type: "token"
            }
          }
        }
      });

      if (payment) {
        setLoading(false);
        setCart([]);
        setPaymentReferenceId(_.get(payment, "data.id", ""));
        setPaidAmount(_.get(payment, "data.attributes.amount", ""));
      }
    } catch {
      setLoading(false);
      Toast.fail(<div>Payment Failed</div>, 1);
    }
  };

  if (paymentReferenceId) {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <Flex justify="center">
          <Icon type={"check-circle"} color="rgb(76, 175, 80)" size="lg" />
        </Flex>
        <WhiteSpace size="lg" />
        <Flex justify="center">
          <div>Payment Successful!</div>
        </Flex>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <Card>
          <Card.Header title="Purchase Details" />
          <Card.Body>
            <WhiteSpace />
            <Flex justify="between">
              <div>Amount:</div>
              <div>{getPesoFormat(paidAmount)}</div>
            </Flex>
            <WhiteSpace />
            <Flex justify="between">
              <div>Reference No:</div>
              <div>{paymentReferenceId}</div>
            </Flex>
          </Card.Body>
        </Card>
      </WingBlank>
    );
  }

  if (cart.length === 0) {
    return (
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        Cart is empty. Please add products your cart.
      </WingBlank>
    );
  }

  return <CheckoutForm loading={loading} onSubmit={handlePay} />;
};
export default PaymentPage;
