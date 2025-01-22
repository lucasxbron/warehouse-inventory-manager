import { routes } from "./routes";

/**
 * Updates the content of the application based on the current URL path.
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
    (await route!.page()) || "";
  }
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
    // updateAppContent(appEl!);
  });
}

export { updateAppContent, initRouter };
