import CartItem from "./CartItem";

export default function CartItems({ cartItems, cartObj }) {
  return (
    <div>
      {cartItems.map((item) => {
        
        return <CartItem key={item.id} item={item} quantity={cartObj[item.id]['quantity']} />;
      })}
    </div>
  );
}
