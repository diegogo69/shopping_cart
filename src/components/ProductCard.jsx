import { useState } from "react";
import { useFetcher } from "react-router-dom";

export default function ProductCard({ product, isAdded }) {
  return (
    <div>
      <div>{product.id}</div>
      <div>{product.title}</div>
      <div>{product.price}</div>
      <img src={product.image} alt={product.title} />
      <AddToCartBtn isAdded={isAdded} productId={product.id} />
    </div>
  );
}

function AddToCartBtn({ isAdded, productId }) {
  const [isHovered, setIsHovered] = useState(false);

  const fetcher = useFetcher();
  const add = fetcher.formData
    ? fetcher.formData.get("add") === "true"
    : isAdded;

  const addedLabel = add ? "Added" : "Add to cart";
  const btnText = isHovered && add ? "Remove" : addedLabel;

  return (
    <fetcher.Form method="post">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        name="add"
        value={add ? "false" : "true"}
        aria-label={add ? "Remove from cart" : "Add to cart"}
      >
        {btnText}
      </button>
      <input type="hidden" name="product-id" value={productId} />
    </fetcher.Form>
  );
}
