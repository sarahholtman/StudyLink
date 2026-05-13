const profileButton = document.getElementById("profileButton");
const profileDropdown = document.getElementById("profileDropdown");
const logoutButton = document.getElementById("logoutButton");

if (profileButton && profileDropdown) {
    profileButton.addEventListener("click", function () {
        profileDropdown.classList.toggle("show");
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        localStorage.clear();
        window.location.href = "/login.html";
    });
}

window.addEventListener("click", function (event) {
    if (
        profileButton &&
        profileDropdown &&
        !profileButton.contains(event.target) &&
        !profileDropdown.contains(event.target)
    ) {
        profileDropdown.classList.remove("show");
    }
});