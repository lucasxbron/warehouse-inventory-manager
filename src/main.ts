import "./css/index.css";
import appLogin from "./features/navigation/login";
import { navigateTo } from "./features/navigation/router";
import { loadHeader } from "./components/header";

const initApp = () => {
  loadHeader();
  navigateTo(window.location.pathname);
};

initApp();
appLogin();
