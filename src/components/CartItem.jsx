import { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import storage from "../storage";

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
  const [counter, setCounter] = useState(quantity);
  const fetcher = useFetcher();

  const quantityChangeHandler = (e) => {
    const val = e.currentTarget.value;
    if (!isPositiveInteger.test(val)) return;

    setCounter(parseInt(val));
  };

  useEffect(() => {
    storage.setItemQuantity(itemId, counter)
  }, [counter])

  return (
    <div>
      <button type="button" onClick={() => setCounter((c) => c - 1)}>
        -
      </button>
      <input
        type="text"
        name="quantity"
        value={counter}
        onChange={quantityChangeHandler}
      />
      <button type="button" onClick={() => setCounter((c) => c + 1)}>
        +
      </button>
    </div>
  );
}
