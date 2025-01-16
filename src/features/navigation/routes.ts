import dashboardPage from "../../pages/dashboard";
import inventoryPage from "../../pages/inventory";
import warehousesPage from "../../pages/warehouses";
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
    path: "/warehouses",
    page: warehousesPage,
  },
  {
    path: "*",
    page: notFoundPage,
  },
];

export { routes };
