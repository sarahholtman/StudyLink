const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const user = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        const message = document.getElementById("message");

        if (response.ok) {
            message.textContent = "Account created successfully.";
            registerForm.reset();
        } else {
            message.textContent = "Something went wrong. Please try again.";
        }
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;

        const response = await fetch(`/api/auth/user/${email}`);

        const user = await response.json();

        const message = document.getElementById("loginMessage");

        if (user && user.email) {

            localStorage.setItem("userId", user.userId);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.name);

            window.location.href = "/dashboard.html";

        } else {

            message.textContent = "Invalid login.";

        }
    });
}