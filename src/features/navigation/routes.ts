import dashboardPage from "../../pages/dashboard";
import inventoryPage from "../../pages/inventory";
// import warehousePage from "../../pages/warehouse";
import notFoundPage from "../../pages/404";

const routes = [
  {
    path: "/",
    page: dashboardPage,
  },
  {
    path: "/inventory",
    page: inventoryPage,
  },
  {
    path: "/warehouse",
    page: inventoryPage,
  },
  {
    path: "*",
    page: notFoundPage,
  },
];

export { routes };
