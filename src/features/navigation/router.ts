import dashboardPage from "../../pages/dashboard";
import inventoryPage from "../../pages/inventory";
import notFoundPage from "../../pages/404";

const routes: { [key: string]: string } = {
  "/": "/src/pages/html/dashboard.html",
  "/inventory": "/src/pages/html/inventory.html",
  "*": "/src/pages/html/404.html",
};

export function navigateTo(url: string) {
  history.pushState(null, "", url);
  loadContent(url);
}

function loadContent(url: string) {
  const path = routes[url] || routes["*"];
  fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load content: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const appElement = document.getElementById("app");
      if (appElement) {
        appElement.innerHTML = data;

        // Reinitialize page-specific scripts
        initializePageLogic();
      } else {
        console.error("App element not found");
      }
    })
    .catch((error) => console.error("Error loading content:", error));
}

export function initializePageLogic() {
  const currentPage = window.location.pathname;

  if (currentPage === "/") {
    dashboardPage();
  } else if (currentPage === "/inventory") {
    inventoryPage();
  } else {
    notFoundPage();
  }
}

export function setupNavigation() {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const url = link.getAttribute("href");
      if (url) {
        navigateTo(url);
      }
    });
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    loadContent(window.location.pathname);
  });
}
