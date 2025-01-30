import users from "../../data/users/login.json";

interface User {
  username: string;
  password: string;
  avatar: string;
}
const bodyEl = document.body;
function checkLogin(): boolean {
  const loggedIn = localStorage.getItem("loggedIn");
  return loggedIn === "true";
}
function renderLoginForm() {
  const formHtml = `
          <div id="login-form" class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
              <div class="bg-white p-8 rounded shadow-md w-full max-w-sm mx-auto">
                  <h1 class="text-neutral-800 font-accent text-2xl italic font-bold mb-1 text-center">Stockflow</h1>
                  <img src="/src/assets/images/stockflow-icon.png" alt="StockFlow Icon" class="mb-10 w-16 h-16 mx-auto" />
                  <input type="text" id="username" placeholder="Username" class="mb-4 p-2 border border-gray-300 rounded w-full" />
                  <input type="password" id="password" placeholder="Password" class="mb-4 p-2 border border-gray-300 rounded w-full" />
                  <button id="login-button" class="bg-blue-500 text-white p-2 rounded w-full">Login</button>
                  <p id="error-message" class="text-red-500 mt-4 hidden text-center">Incorrect username or password</p>
              </div>
          </div>
      `;
  bodyEl.innerHTML = formHtml;
  const loginButton =
    document.querySelector<HTMLButtonElement>("#login-button");
  const usernameInput = document.querySelector<HTMLInputElement>("#username");
  const passwordInput = document.querySelector<HTMLInputElement>("#password");
  loginButton!.addEventListener("click", handleLogin);
  usernameInput!.addEventListener("keydown", handleKeyDown);
  passwordInput!.addEventListener("keydown", handleKeyDown);
}
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    handleLogin();
  }
}
/**
 * Handles the login process by validating the username and password input fields.
 * If the credentials match a user in the `users` array, it sets the login status
 * and user avatar in local storage and reloads the page. If the credentials do not match,
 * it displays an error message.
 *
 * @remarks
 * This function assumes that the `users` array and `User` type are defined elsewhere in the code.
 * It also assumes that the HTML elements with IDs `#username`, `#password`, and `#error-message`
 * exist in the DOM.
 */
function handleLogin() {
  const usernameInput =
    document.querySelector<HTMLInputElement>("#username")!.value;
  const passwordInput =
    document.querySelector<HTMLInputElement>("#password")!.value;
  const errorMessage =
    document.querySelector<HTMLParagraphElement>("#error-message");
  const user = users.find(
    (user: User) =>
      user.username === usernameInput && user.password === passwordInput,
  );
  if (user) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("avatar", user.avatar); // Save avatar in local storage
    location.reload();
  } else {
    errorMessage!.classList.remove("hidden");
  }
}
function appLogin() {
  if (checkLogin()) {
  } else {
    // User is not logged in, show login form
    renderLoginForm();
  }
}
export default appLogin;
