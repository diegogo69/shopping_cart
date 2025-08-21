import ProductCard from "./ProductCard";

export default function ProductCards({ products, cartProducts }) {
  // const products = [
  //   { name: "cambur", price: "1" },
  //   { name: "apple", price: "5" },
  // ];

  return (
    <div>
      {products.map((product) => {
        const isAdded = cartProducts
          // ? cartProducts.includes(product.id)
          ? Object.hasOwn(cartProducts, product.id)
          : false;
        return (
          <ProductCard key={product.id} product={product} isAdded={isAdded} />
        );
      })}
    </div>
  );
}
