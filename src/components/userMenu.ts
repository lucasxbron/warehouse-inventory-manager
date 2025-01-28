export async function initializeUserMenu() {
  const setupUserMenu = () => {
    const userButton = document.getElementById("user");
    const header = document.querySelector("header");

    if (userButton && header) {
      userButton.addEventListener("click", () => {
        const menu = document.createElement("div");
        menu.className =
          "absolute bg-white border border-gray-300 shadow-lg z-50 rounded-lg mr-7 mt-1";
        menu.style.top = `${header.offsetHeight}px`;
        menu.style.right = "0";

        const settingsItem = document.createElement("div");
        settingsItem.textContent = "Settings";
        settingsItem.className = "p-2 cursor-pointer hover:bg-gray-100 rounded";

        settingsItem.addEventListener("click", () => {
          // alert('Settings clicked');
        });

        const logoutItem = document.createElement("div");
        logoutItem.textContent = "Log Out";
        logoutItem.className = "p-2 cursor-pointer hover:bg-gray-100 rounded";

        logoutItem.addEventListener("click", () => {
          localStorage.setItem("loggedIn", "false");
          location.reload();
        });

        menu.appendChild(settingsItem);
        menu.appendChild(logoutItem);

        document.body.appendChild(menu);

        setTimeout(() => {
          document.addEventListener(
            "click",
            (event) => {
              if (
                !menu.contains(event.target as Node) &&
                event.target !== userButton
              ) {
                menu.remove();
              }
            },
            { once: true },
          );
        }, 0);
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupUserMenu);
  } else {
    setupUserMenu();
  }
}
