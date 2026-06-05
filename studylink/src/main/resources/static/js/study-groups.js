const modal = document.getElementById("createGroupModal");
const openModalButton = document.getElementById("openCreateGroupModal");
const closeModalButton = document.getElementById("closeModal");

const joinSuccessModal = document.getElementById("joinSuccessModal");
const closeJoinModal = document.getElementById("closeJoinModal");
const goToGroupDetailsButton = document.getElementById("goToGroupDetailsButton");

const groupResults = document.getElementById("studyGroupResults");
const recommendedGroups = document.getElementById("recommendedGroups");
const searchForm = document.getElementById("groupSearchForm");
const createGroupForm = document.getElementById("createGroupForm");

const alreadyMemberModal = document.getElementById("alreadyMemberModal");
const closeAlreadyMemberModal = document.getElementById("closeAlreadyMemberModal");
const goToExistingGroupDetailsButton = document.getElementById("goToExistingGroupDetailsButton");

let joinedGroupId = null;

var studyGroupCurrentPage = 1;
const groupsPerPage = 10;

if (openModalButton) {
    openModalButton.addEventListener("click", function () {
        modal.style.display = "block";
    });
}

if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
}

if (closeJoinModal) {
    closeJoinModal.addEventListener("click", function () {
        joinSuccessModal.style.display = "none";
    });
}

if (goToGroupDetailsButton) {
    goToGroupDetailsButton.addEventListener("click", function () {
        if (joinedGroupId) {
            window.location.href = `/group-details.html?groupId=${joinedGroupId}`;
        }
    });
}

if (closeAlreadyMemberModal) {
    closeAlreadyMemberModal.addEventListener("click", function () {
        alreadyMemberModal.style.display = "none";
    });
}

if (goToExistingGroupDetailsButton) {
    goToExistingGroupDetailsButton.addEventListener("click", function () {
        if (joinedGroupId) {
            window.location.href = `/group-details.html?groupId=${joinedGroupId}`;
        }
    });
}

window.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.style.display = "none";
    }

    if (event.target === joinSuccessModal) {
        joinSuccessModal.style.display = "none";
    }

    if (event.target === alreadyMemberModal) {
        alreadyMemberModal.style.display = "none";
    }
});

async function loadAllStudyGroups() {

    const response = await fetch("/api/study-groups");
    const groups = await response.json();

    displayStudyGroups(groups);
}

function displayStudyGroups(groups) {

    groupResults.innerHTML = "";

    if (groups.length === 0) {
        groupResults.innerHTML = "<p>No study groups found.</p>";
        return;
    }

    const startIndex = (studyGroupCurrentPage - 1) * groupsPerPage;
    const endIndex = startIndex + groupsPerPage;

    const paginatedGroups = groups.slice(startIndex, endIndex);

    paginatedGroups.forEach(group => {

        const card = document.createElement("div");
        card.classList.add("group-card");

        card.innerHTML = `
            <h3>${group.groupName}</h3>

            <p><strong>Course Code:</strong> ${group.courseCode || "N/A"}</p>

            <p><strong>School:</strong> ${group.schoolName || "N/A"}</p>

            <p><strong>Course:</strong> ${group.courseName || "N/A"}</p>

            <p>${group.description || ""}</p>

            <button onclick="joinStudyGroup(${group.groupId})">Join Group</button>
        `;

        groupResults.appendChild(card);
    });

    const totalPages = Math.ceil(groups.length / groupsPerPage);

    document.getElementById("pageInfo").textContent =
        `Page ${studyGroupCurrentPage} of ${totalPages || 1}`;

    document.getElementById("prevPage").disabled = studyGroupCurrentPage === 1;

    document.getElementById("nextPage").disabled =
        studyGroupCurrentPage >= totalPages;
}

if (searchForm) {

    searchForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const schoolName = document.getElementById("filterSchool").value.trim();
        const courseName = document.getElementById("filterProgram").value.trim();
        const courseCode = document.getElementById("filterCourseCode").value.trim();

        const response = await fetch(
            `/api/study-groups/search?schoolName=${encodeURIComponent(schoolName)}&courseName=${encodeURIComponent(courseName)}&courseCode=${encodeURIComponent(courseCode)}`
        );

        const groups = await response.json();

        studyGroupCurrentPage = 1;

        displayStudyGroups(groups);
    });
}

document.getElementById("prevPage").addEventListener("click", function () {
    if (studyGroupCurrentPage > 1) {
        studyGroupCurrentPage--;
        loadAllStudyGroups();
    }
});

document.getElementById("nextPage").addEventListener("click", function () {
    studyGroupCurrentPage++;
    loadAllStudyGroups();
});

async function loadRecommendedGroups() {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        return;
    }

    const response = await fetch(`/api/user-courses/${userId}`);
    const courses = await response.json();

    recommendedGroups.innerHTML = "";

    if (courses.length === 0) {
        recommendedGroups.innerHTML =
            "<p>No recommended groups found yet.</p>";
        return;
    }

    const matchedGroups = [];

    for (const course of courses) {

        const response = await fetch(
            `/api/study-groups/search?schoolName=${encodeURIComponent(course.school)}&courseName=${encodeURIComponent(course.program)}&courseCode=${encodeURIComponent(course.courseCode)}`
        );

        const groups = await response.json();

        groups.forEach(group => {

            const alreadyExists = matchedGroups.some(
                existingGroup => existingGroup.groupId === group.groupId
            );

            if (!alreadyExists) {
                matchedGroups.push(group);
            }
        });
    }

    if (matchedGroups.length === 0) {
        recommendedGroups.innerHTML =
            "<p>No recommended groups found yet.</p>";
        return;
    }

    matchedGroups.forEach(group => {

        const card = document.createElement("div");
        card.classList.add("group-card");

        card.innerHTML = `
            <div class="match-badge">Recommended Match</div>

            <h3>${group.groupName}</h3>

            <p><strong>Course Code:</strong> ${group.courseCode}</p>

            <p><strong>School:</strong> ${group.schoolName}</p>

            <p><strong>Course:</strong> ${group.courseName}</p>

            <button onclick="joinStudyGroup(${group.groupId})">Join Group</button>
        `;

        recommendedGroups.appendChild(card);
    });
}

if (createGroupForm) {

    createGroupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const userId = localStorage.getItem("userId");

        const studyGroup = {

            groupName: document.getElementById("groupName").value,

            courseCode: document.getElementById("groupCourseCode").value,

            schoolName: document.getElementById("groupSchool").value,

            courseName: document.getElementById("groupCourseName").value,

            section: document.getElementById("groupSection").value,

            description: document.getElementById("groupDescription").value,

            createdBy: {
                userId: userId
            }
        };

        const response = await fetch("/api/study-groups", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(studyGroup)
        });

        if (response.ok) {

            modal.style.display = "none";

            createGroupForm.reset();

            studyGroupCurrentPage = 1;

            loadAllStudyGroups();
            loadRecommendedGroups();

        } else {

            alert("Could not create study group.");
        }
    });
}

async function joinStudyGroup(groupId) {

    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Please log in before joining a group.");
        window.location.href = "/login.html";
        return;
    }

    const membership = {
        user: {
            userId: userId
        },
        studyGroup: {
            groupId: groupId
        }
    };

    const response = await fetch("/api/study-groups/join", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(membership)
    });

    if (response.ok) {

        joinedGroupId = groupId;

        joinSuccessModal.style.display = "block";

        loadAllStudyGroups();
        loadRecommendedGroups();

    } else if (response.status === 409) {

        joinedGroupId = groupId;

        alreadyMemberModal.style.display = "block";

    } else {

        alert("Could not join this study group.");
    }
}

loadAllStudyGroups();
loadRecommendedGroups();