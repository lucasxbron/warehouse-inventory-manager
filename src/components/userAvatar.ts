export function updateUserAvatar() {
  const updateAvatar = () => {
    const userButton = document.getElementById("user");
    const avatar = localStorage.getItem("avatar");

    if (userButton instanceof HTMLElement && avatar && avatar.trim() !== "") {
      console.log("Avatar updated");
      userButton.innerHTML = `<img src="${avatar}" alt="User Avatar">`;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateAvatar);
  } else {
    updateAvatar();
  }
}
