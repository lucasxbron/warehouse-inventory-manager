import "./css/index.css";
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'

import { navigation } from "./features/navigation/navigation";
import { initRouter } from "./features/navigation/router";

const appEl = document.querySelector<HTMLDivElement>("#app");

initRouter(appEl!);
navigation(appEl!);
<<<<<<< HEAD


// LOGIN
=======
>>>>>>> 4ec6d821559c2c0d31ee849422666305d7b9580d
