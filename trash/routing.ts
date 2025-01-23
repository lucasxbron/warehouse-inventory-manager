type Routes = {
  [key: string]: string;
};

const routes: Routes = {
  "*": "/src/pages/html/404.html",
  "/": "/src/pages/html/dashboard.html",
  "/inventory": "/src/pages/html/inventory.html",
  // "/lorem": "/pages/lorem.html",
};

const route = (event: Event) => {
  if (!event) {
    return;
  }
  event.preventDefault();
  const target = event.target as HTMLAnchorElement;
  window.history.pushState({}, "", target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  const mainPage = document.getElementById("app");
  if (mainPage) {
    mainPage.innerHTML = html;
  }
};

window.onpopstate = handleLocation;
(window as any).route = route;

handleLocation();
