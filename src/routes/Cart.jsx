import { useLoaderData } from "react-router-dom";
import CartItems from "../components/CartItems";
import storage from "../storage";

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

  return { cartItems, cartObj };
}

// Action
export async function cartAction({ request }) {
  const formData = await request.formData();
  const productId = formData.get("product-id");
  const add = formData.get("add");

  if (add === "true") {
    storage.addToCart(productId);
  } else if (add === "false") {
    storage.removeFromCart(productId);
  }

}

export default function Cart() {
  const { cartItems, cartObj } = useLoaderData();

  return (
    <>
      <div>Hello Cart</div>
      <CartItems cartItems={cartItems} cartObj={cartObj} />
    </>
  );
}
