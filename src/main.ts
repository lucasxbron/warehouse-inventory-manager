import "./css/index.css";
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'

        import { navigation } from "./features/navigation/navigation";
import { initRouter } from "./features/navigation/router";

const appEl = document.querySelector<HTMLDivElement>("#app");

initRouter(appEl!);
navigation(appEl!);
