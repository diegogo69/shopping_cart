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
    storage.set("cart", []);
  },
  getCart() {
    return this.get("cart");
  },
  setCart(value) {
    this.set("cart", value);
  },
  addToCart(value) {
    const cart = this.getCart();
    if (cart.includes(value)) return;
    cart.push(value);
    this.setCart(cart);
  },
  removeFromCart(value) {
    const cart = this.getCart();
    cart.splice(cart.indexOf(value), 1);
    this.setCart(cart);
  },
};

storage.init();

export default storage;
