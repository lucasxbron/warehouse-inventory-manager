import './css/index.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'

import contactPage from "./pages/contact";
import homePage from "./pages/home";
import notFoundPage from "./pages/404";

const appEl = document.querySelector<HTMLDivElement>("#app");

const navLinksElements = document.querySelectorAll("a");

navLinksElements.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetPath = (event.target as HTMLAnchorElement).getAttribute("href");
    history.pushState({}, "", targetPath);
    updateAppContent();
  });
});

async function updateAppContent() {
  const currentPath = window.location.pathname;
  let content = "";
  console.log("🚀 ~ currentPath:", currentPath);
  if (currentPath === "/") {
    content = await homePage();
  } else if (currentPath === "/contact") {
    content = await contactPage();
  } else {
    content = await notFoundPage();
  }

  appEl!.innerHTML = content;
}