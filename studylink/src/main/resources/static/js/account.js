const accountName = document.getElementById("accountName");
const accountEmail = document.getElementById("accountEmail");
const summaryName = document.getElementById("summaryName");
const summaryEmail = document.getElementById("summaryEmail");
const accountForm = document.getElementById("accountForm");
const accountMessage = document.getElementById("accountMessage");
const dashboardUserName = document.getElementById("dashboardUserName");

const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

if (userName) {
    accountName.value = userName;
    summaryName.textContent = userName;
    dashboardUserName.textContent = userName;
}

if (userEmail) {
    accountEmail.value = userEmail;
    summaryEmail.textContent = userEmail;
}

if (accountForm) {
    accountForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedName = accountName.value;

        localStorage.setItem("userName", updatedName);
        summaryName.textContent = updatedName;
        dashboardUserName.textContent = updatedName;

        accountMessage.textContent = "Account changes saved locally.";
    });
}