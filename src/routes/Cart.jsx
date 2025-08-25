import { useLoaderData } from "react-router-dom";
import CartItems from "../components/CartItems";
import storage from "../storage";
import { useEffect, useState } from "react";

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

// Loader
export async function cartLoader() {
  const cartObj = storage.getCart();
  const itemsIndex = Object.keys(cartObj);

  const response = await Promise.all(
    itemsIndex.map((itemId) =>
      fetch(`https://fakestoreapi.com/products/${itemId}`)
    )
  );
  const cartItems = await Promise.all(response.map((res) => res.json()));
  console.log(cartItems);
  console.log(cartObj);
  const cartTotal = getCartTotal(cartItems, cartObj);

  return { cartItems, cartObj, cartTotal };
}

// Action
export async function cartAction({ request }) {
  const formData = await request.formData();
  const productId = formData.get("product-id");
  const quantity = parseInt(formData.get("quantity"));

  storage.setItemQuantity(productId, quantity);
}

export default function Cart() {
  const { cartItems, cartObj, cartTotal } = useLoaderData();

  return (
    <>
      <div>Hello Cart - Total $ {cartTotal}</div>
      <CartItems cartItems={cartItems} cartObj={cartObj} />
    </>
  );
}
