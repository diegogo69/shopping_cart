import { useLoaderData } from "react-router-dom";
import ProductCards from "../components/ProductCards";
import storage from "../storage";

// Loader
export async function shopLoader() {
  const fetchProducts = await fetch("https://fakestoreapi.com/products");
  const products = await fetchProducts.json();
  const cartProducts = storage.getCart();

  return { products, cartProducts };
}

// Action
export async function shopAction({ request }) {
  const formData = await request.formData();
  const productId = formData.get("product-id");
  const add = formData.get("add");

  if (add === "true") {
    storage.addToCart(productId);
  } else if (add === "false") {
    storage.removeFromCart(productId);
  }
  // storage.clear()
}

export default function Shop() {
  const { products, cartProducts } = useLoaderData();

  return (
    <>
      <div>Hello Shop</div>
      <ProductCards products={products} cartProducts={cartProducts} />
    </>
  );
}
