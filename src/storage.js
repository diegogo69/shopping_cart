const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
  has(key) {
    return localStorage.getItem(key) !== null;
  },
  init() {
    if (localStorage.getItem("cart")) return;
    storage.set("cart", {});
  },
  getCart() {
    return this.get("cart");
  },
  setCart(value) {
    this.set("cart", value);
  },
  addToCart(productId) {
    const cart = this.getCart();
    const newProduct = { id: productId, quantity: 1 };
    cart[productId] = newProduct;
    // const updateCart = { ...cart, [productId]: newProduct };
    this.setCart(cart);
  },
  removeFromCart(productId) {
    const cart = this.getCart();
    delete cart[productId];
    this.setCart(cart);
  },
  setItemQuantity(productId, quantity) {
    const cart = this.getCart();
    cart[productId]["quantity"] = quantity;
    this.setCart(cart);
  },
};

storage.init();

export default storage;
