const courseForm = document.getElementById("courseForm");
const courseList = document.getElementById("courseList");

const profileUserId = localStorage.getItem("userId");

async function loadUserCourses() {
    if (!courseList) return;

    if (!userId) {
        courseList.innerHTML = "<p>Please log in again before adding courses.</p>";
        return;
    }

    const response = await fetch(`/api/user-courses/${profileUserId}`);

    if (!response.ok) {
        courseList.innerHTML = "<p>Could not load courses.</p>";
        return;
    }

    const courses = await response.json();

    courseList.innerHTML = "";

    if (courses.length === 0) {
        courseList.innerHTML = "<p>No courses added yet.</p>";
        return;
    }

    courses.forEach(course => {
        const item = document.createElement("div");
        item.classList.add("list-item");

        item.innerHTML = `
            <h3>${course.courseCode}</h3>
            <p>${course.school} | ${course.program}</p>
        `;

        courseList.appendChild(item);
    });
}

if (courseForm) {
    courseForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (!userId) {
            courseList.innerHTML = "<p>Please log in again before adding courses.</p>";
            return;
        }

        const course = {
            courseCode: document.getElementById("courseCode").value,
            school: document.getElementById("school").value,
            program: document.getElementById("program").value
        };

        const response = await fetch(`/api/user-courses/${profileUserId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(course)
        });

        if (response.ok) {
            courseForm.reset();
            loadUserCourses();
        } else {
            courseList.innerHTML = "<p>Course could not be added.</p>";
        }
    });
}

loadUserCourses();