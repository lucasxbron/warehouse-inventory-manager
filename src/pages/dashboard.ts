function dashboardPage() {
  const dashboardMenu = document.getElementById("dashboard");
  if (dashboardMenu) {
    const h1 = document.createElement("h1");
    h1.className =
      "font-accent text-2xl md:text-3xl font-bold text-gray-800 mx-12 text-center";
    h1.textContent = "The dashboard is currently in development!";
    dashboardMenu.appendChild(h1);
    const p = document.createElement("p");
    p.className = "text-gray-600 mt-4 text-center";
    p.textContent =
      "Please check back later for an overview of your inventory and other important metrics.";
    dashboardMenu.appendChild(p);

    const divCube = document.createElement("div");
    divCube.className = "cube mt-10";
    for (let i = 0; i < 6; i++) {
      const div = document.createElement("div");
      divCube.appendChild(div);
    }
    dashboardMenu.appendChild(divCube);

    const button = document.createElement("button");
    button.className =
      "mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700";
    button.textContent = "Go to Inventory";
    button.onclick = () => {
      window.history.pushState({}, "", "/inventory");
      const popStateEvent = new PopStateEvent("popstate", { state: {} });
      dispatchEvent(popStateEvent);
    };
    dashboardMenu.appendChild(button);
  }
}

export default dashboardPage;
