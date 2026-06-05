const params = new URLSearchParams(window.location.search);
const groupId = params.get("groupId");

const userName = localStorage.getItem("userName");

if (userName) {
    document.getElementById("dashboardUserName").textContent = userName;
}

async function loadGroupDetails() {
    if (!groupId) {
        document.getElementById("groupDescription").textContent =
            "No study group was selected.";
        return;
    }

    const response = await fetch(`/api/study-groups/${groupId}`);

    if (!response.ok) {
        document.getElementById("groupDescription").textContent =
            "Could not load study group details.";
        return;
    }

    const group = await response.json();

    document.getElementById("groupName").textContent =
        group.groupName || "Study Group";

    document.getElementById("groupDescription").textContent =
        group.description || "No description provided.";

    document.getElementById("courseCode").textContent =
        group.courseCode || "Not provided";

    document.getElementById("schoolName").textContent =
        group.schoolName || "Not provided";

    document.getElementById("courseName").textContent =
        group.courseName || "Not provided";

    document.getElementById("section").textContent =
        group.section || "Not provided";

    document.getElementById("meetingTime").textContent =
        group.meetingTime || "Not provided";
}

loadGroupDetails();