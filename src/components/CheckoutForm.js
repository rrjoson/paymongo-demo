import React, { useState } from "react";
import {
  WingBlank,
  List,
  InputItem,
  Button,
  WhiteSpace,
  ActivityIndicator
} from "antd-mobile";

/**
 * @param {Object} props
 * @param {boolean} props.loading
 * @param {function} props.onSubmit
 */
const CheckoutForm = ({ loading, onSubmit }) => {
  const [name, setName] = useState("Ricardo Joson");
  const [email, setEmail] = useState("ricardo@email.com");
  const [cardNumber, setCardNumber] = useState("4242424242424242");
  const [cardExpiry, setCardExpiry] = useState("1/23");
  const [cardCvc, setCardCvc] = useState("111");

  return (
    <WingBlank size="lg">
      <ActivityIndicator
        toast
        text="Processing payment, please wait."
        animating={loading}
      />
      <List renderHeader={() => "Billing Details"}>
        <InputItem
          placeholder=""
          value={name}
          onChange={value => setName(value)}
        >
          Name
        </InputItem>
        <InputItem
          placeholder=""
          value={email}
          onChange={value => setEmail(value)}
        >
          Email
        </InputItem>
      </List>
      <WhiteSpace />
      <List renderHeader={() => "Credit Card"}>
        <InputItem
          placeholder=""
          value={cardNumber}
          onChange={value => setCardNumber(value)}
          clear
        >
          Card
        </InputItem>
        <InputItem
          placeholder=""
          value={cardExpiry}
          onChange={value => setCardExpiry(value)}
        >
          Expiry
        </InputItem>
        <InputItem
          placeholder=""
          value={cardCvc}
          onChange={value => setCardCvc(value)}
        >
          CVC
        </InputItem>
      </List>
      <WhiteSpace />
      <Button
        type="primary"
        onClick={() => {
          onSubmit({
            name,
            email,
            cardNumber,
            cardExpiry,
            cardCvc
          });
        }}
      >
        Pay with paymongo
      </Button>
      <WhiteSpace />
    </WingBlank>
  );
};
export default CheckoutForm;
