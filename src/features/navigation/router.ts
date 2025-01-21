import { routes } from "./routes";

/**
 * Updates the content of the application based on the current URL path.
 *
 * @param {HTMLDivElement} appEl - The HTML element where the content will be injected.
 * @returns {Promise<void>} A promise that resolves when the content has been updated.
 */
// async function updateAppContent(appEl: HTMLDivElement) {
async function updateAppContent() {
  const currentPath = window.location.pathname;
  // let content = "";
  // const route =
  //   routes.find((route) => route.path === currentPath) ||
  //   routes.find((route) => route.path === "*");
  const route =
    routes.find((route) => route.path === currentPath) ||
    routes.find((route) => route.path === "*");
  if (route) {
    console.log(route);
  }
  //   content = (await route!.page()) || "";
  // console.log(route);
  // console.log(content);
  //   appEl!.innerHTML = content;
}

/**
 * Initializes the router by setting up an event listener for the window's load event.
 * When the window loads, it updates the application content.
 *
 * @param appEl - The HTMLDivElement that represents the main application element.
 */
// function initRouter(appEl: HTMLDivElement) {
function initRouter() {
  window.addEventListener("load", () => {
    // updateAppContent(appEl!);
  });
}

export { updateAppContent, initRouter };
