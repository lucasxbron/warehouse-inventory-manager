import "./css/index.css";
import users from "./data/users/login.json";
import { navigateTo } from "./features/navigation/router";

const initializeApp = () => {
  // Load the header dynamically
  // loadHeader();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);
};

initializeApp();

// window.addEventListener("popstate", () => {
//   navigateTo(window.location.pathname);
// });
