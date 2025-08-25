import { useEffect, useState } from "react";
import storage from "../storage";
import { useFetcher } from "react-router-dom";

export default function CartItem({ item, quantity }) {
  return (
    <div>
      <div>{item.id}</div>
      <div>{item.title}</div>
      <div>{item.price}</div>
      <img src={item.image} alt={item.title} />
      <Quantifier itemId={item.id} quantity={quantity} />
    </div>
  );
}

const isPositiveInteger = /^[1-9]\d*$/;
function Quantifier({ itemId, quantity }) {
  const fetcher = useFetcher();
  const add = fetcher.formData
    ? fetcher.formData.get("quantity") !== quantity
    : isAdded;

  const quantityChangeHandler = (e) => {
    const val = e.currentTarget.value;
    if (!isPositiveInteger.test(val)) return;
  };

  return (
    <div>
      <fetcher.Form method="post">
        <button type="submit" name="quantity" value={quantity - 1}>
          -
        </button>
        <input type="hidden" name="product-id" value={itemId} />
      </fetcher.Form>

      <fetcher.Form method="post">
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={quantityChangeHandler}
        />
        <input type="hidden" name="product-id" value={itemId} />
      </fetcher.Form>

      <fetcher.Form method="post">
        <button name="quantity" value={quantity + 1}>
          +
        </button>
        <input type="hidden" name="product-id" value={itemId} />
      </fetcher.Form>
    </div>
  );
}
