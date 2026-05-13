const protectedPages = [
    "/dashboard.html",
    "/my-courses.html",
    "/study-groups.html"
];

const currentPage = window.location.pathname;

const userId = localStorage.getItem("userId");

if (protectedPages.includes(currentPage) && !userId) {
    window.location.href = "/login.html";
}