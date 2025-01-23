import { setupNavigation } from "../features/navigation/router";

export function loadHeader() {
  fetch("/src/components/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch header: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data) => {
      const headerElement = document.getElementById("navigation");
      if (headerElement) {
        headerElement.innerHTML = data;
        setupNavigation();
      } else {
        console.error("Header element not found");
      }
    })
    .catch((error) => console.error("Error loading header:", error));
}
