import { updateAppContent } from "./router";

const navLinksElements = document.querySelectorAll("a");

/**
 * Sets up navigation for the application by adding click event listeners to navigation links.
 * When a navigation link is clicked, it prevents the default behavior, updates the browser's history state,
 * and updates the application content.
 *
 * @param {HTMLDivElement} appEl - The main application container element.
 */
// function navigation(appEl: HTMLDivElement) {
function navigation() {
  navLinksElements.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetPath = (event.target as HTMLAnchorElement).getAttribute(
        "href",
      );
      // console.log(targetPath);
      history.pushState({}, "", targetPath);
      // updateAppContent(appEl);
      updateAppContent();
    });
  });
}

export { navigation };
