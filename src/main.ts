import "./css/index.css";
import appLogin from "./features/navigation/login";
import { navigateTo } from "./features/navigation/router";
import { loadHeader } from "./components/header";
import { initializeDefaultProducts } from "./components/defaultProducts";

const initApp = () => {
  loadHeader();
  navigateTo(window.location.pathname);
};

initApp();
appLogin();
initializeDefaultProducts();
