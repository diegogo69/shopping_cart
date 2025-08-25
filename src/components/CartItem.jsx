import { useEffect, useState } from "react";
import storage from "../storage";
import { useFetcher } from "react-router-dom";

export default function CartItem({ item, quantity, inputQu }) {
  const fetcher = useFetcher();

  return (
    <div>
      <fetcher.Form method="post">
        <button type="submit">Remove</button>
        <input type="hidden" name="item-id" value={item.id} />
      </fetcher.Form>
      <div>{item.id}</div>
      <div>{item.title}</div>
      <div>{item.price}</div>
      <img src={item.image} alt={item.title} />
      <Quantifier itemId={item.id} quantity={quantity} inputQu={inputQu} />
    </div>
  );
}

const isPositiveInteger = /^[1-9]\d*$/;
function Quantifier({ itemId, quantity, inputQu }) {
  // const add = fetcher.formData
  //   ? fetcher.formData.get("quantity") !== quantity
  //   : isAdded;

  const quantityIncreaseHandler = (e) => {
    e.preventDefault();
    inputQu(itemId, quantity + 1);
    console.log("called increase");
  };

  const quantityDecreaseHandler = (e) => {
    e.preventDefault();
    inputQu(itemId, quantity - 1);
  };

  const validateQuInput = (e) => {
    const val = e.currentTarget.value;
    if (val === "") {
      e.currentTarget.value = quantity;
      e.currentTarget.select();
      return;
    }

    if (!isPositiveInteger.test(val)) return;

    inputQu(itemId, val);
  };

  return (
    <div>
      <button
        type="submit"
        name="quantity"
        value={quantity - 1}
        onClick={quantityDecreaseHandler}
      >
        -
      </button>

      <input
        type="text"
        name="quantity"
        value={quantity}
        onChange={validateQuInput}
      />

      <button
        name="quantity"
        value={quantity + 1}
        onClick={quantityIncreaseHandler}
      >
        +
      </button>
    </div>
  );
}
