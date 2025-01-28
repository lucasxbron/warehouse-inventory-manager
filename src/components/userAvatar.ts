export async function updateUserAvatar() {
  const updateAvatar = () => {
    const userButton = document.getElementById("user");
    if (!userButton) {
      console.error("User button not found");
      return;
    }
    const avatar = localStorage.getItem("avatar");

    if (userButton instanceof HTMLElement && avatar) {
      userButton.innerHTML = `<img src="${avatar}" alt="User Avatar" class="rounded-full border-2 border-white">`;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateAvatar);
  } else {
    updateAvatar();
  }
}
