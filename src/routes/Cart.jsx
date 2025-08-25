import { useLoaderData } from "react-router-dom";
import CartItems from "../components/CartItems";
import storage from "../storage";
import { useEffect, useState } from "react";

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

  return { cartItems, cartObj };
}

// Action
export async function cartAction({ request }) {
  const formData = await request.formData();
  const productId = formData.get("item-id");
  storage.removeFromCart(productId);
}

export default function Cart() {
  const { cartItems, cartObj } = useLoaderData();

  return (
    <>
      <CartItems cartItems={cartItems} cartObj={cartObj} />
    </>
  );
}
