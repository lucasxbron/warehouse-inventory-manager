import dashboardPage from "../src/pages/dashboard";
import inventoryPage from "../src/pages/inventory";
// import warehousePage from "../../pages/warehouse";
import notFoundPage from "../src/pages/404";

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
