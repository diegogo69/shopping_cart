import CartItem from "./CartItem";

export default function CartItems({ cartItems, cartObj }) {
  return (
    <div>
      {cartItems.map((item) => {
        const quantity = parseInt(cartObj[item.id]["quantity"]);

        return <CartItem key={item.id} item={item} quantity={quantity} />;
      })}
    </div>
  );
}
