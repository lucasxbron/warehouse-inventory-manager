function notFoundPage() {
  const notFound = document.getElementById("not-found");
  if (notFound) {
    const h1 = document.createElement("h1");
    h1.className =
      "font-accent text-2xl md:text-3xl font-bold text-gray-800 mx-12 text-center";
    h1.textContent = "Page not found!";
    notFound.appendChild(h1);
    const p = document.createElement("p");
    p.className = "text-gray-600 mt-4 text-center";
    p.textContent =
      "Sorry, the page you are looking for does not exist. Please check the URL or return to the homepage.";
    notFound.appendChild(p);

    const button = document.createElement("button");
    button.className =
      "mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700";
    button.textContent = "Go to Homepage";
    button.onclick = () => {
      window.history.pushState({}, "", "/");
      const popStateEvent = new PopStateEvent("popstate", { state: {} });
      dispatchEvent(popStateEvent);
    };
    notFound.appendChild(button);
  }
}

export default notFoundPage;
