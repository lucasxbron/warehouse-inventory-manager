import "./css/index.css";
import appLogin from "./features/navigation/login";
import { navigateTo } from "./features/navigation/router";
import { loadHeader } from "./components/header";

const initApp = () => {
  // Load the header dynamically
  loadHeader();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);
};

initApp();

window.addEventListener("popstate", () => {
  navigateTo(window.location.pathname);
});

appLogin();
