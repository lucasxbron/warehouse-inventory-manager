import defaultProducts from "../data/defaultProducts.json";

export function initializeDefaultProducts() {
  if (localStorage.getItem("loggedIn")) {
    return;
  }
  const products = JSON.parse(localStorage.getItem("products") || "[]");
  if (products.length === 0) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
  }
}
