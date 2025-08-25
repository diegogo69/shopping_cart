import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import storage from "../storage";

const getCartTotal = (cartItems, cartObj) => {
  const cartTotal = cartItems
    .map((item) => {
      const itemQu = parseInt(cartObj[item.id]["quantity"]);
      const itemTotal = item.price * itemQu;
      return itemTotal;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return cartTotal;
};

export default function CartItems({ cartItems, cartObj }) {
  const [cartQu, setCartQu] = useState(cartObj);
  const cartTotal = getCartTotal(cartItems, cartQu);

  const inputQu = (id, quantity) => {
    const updItemQu = { id, quantity };
    const updCartQu = { ...cartQu, [id]: updItemQu };
    setCartQu(updCartQu);
  };

  useEffect(() => {
    storage.setCart(cartQu);
  }, [cartQu]);

  return (
    <>
      <div>Cart items total: {cartTotal}</div>
      <div>
        {cartItems.map((item) => {
          const quantity = parseInt(cartQu[item.id]["quantity"]);

          return (
            <CartItem
              key={item.id}
              item={item}
              quantity={quantity}
              inputQu={inputQu}
            />
          );
        })}
      </div>
    </>
  );
}
