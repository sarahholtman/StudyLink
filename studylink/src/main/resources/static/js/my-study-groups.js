const allMyStudyGroups = document.getElementById("allMyStudyGroups");

async function loadAllMyStudyGroups() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        allMyStudyGroups.innerHTML = "<p>Please log in again.</p>";
        return;
    }

    const response = await fetch(`/api/study-groups/user/${userId}`);

    if (!response.ok) {
        allMyStudyGroups.innerHTML = "<p>Could not load your study groups.</p>";
        return;
    }

    const memberships = await response.json();

    allMyStudyGroups.innerHTML = "";

    if (memberships.length === 0) {
        allMyStudyGroups.innerHTML = "<p>You have not joined any study groups yet.</p>";
        return;
    }

    memberships.forEach(membership => {

        const group = membership.studyGroup;

        const card = document.createElement("div");
        card.classList.add("group-card");

        card.innerHTML = `
            <h3>${group.groupName}</h3>

            <p><strong>Course Code:</strong> ${group.courseCode || "N/A"}</p>

            <p><strong>School:</strong> ${group.schoolName || "N/A"}</p>

            <p><strong>Course:</strong> ${group.courseName || "N/A"}</p>

            <p>${group.description || ""}</p>

            <button onclick="window.location.href='group-details.html?groupId=${group.groupId}'">
                View Details
            </button>
        `;

        allMyStudyGroups.appendChild(card);
    });
}

loadAllMyStudyGroups();