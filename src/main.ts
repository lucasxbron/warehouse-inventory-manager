import "./css/index.css";
import appLogin from "./features/navigation/login";
import { navigateTo } from "./features/navigation/router";
import { loadHeader } from "./components/header";
import { updateUserAvatar } from "./components/userAvatar";

const initApp = () => {
  // Load the header dynamically
  loadHeader();

  // Load the initial content based on the current URL
  navigateTo(window.location.pathname);
};

initApp();
appLogin();
updateUserAvatar();

// window.addEventListener("popstate", () => {
//   navigateTo(window.location.pathname);
// });
