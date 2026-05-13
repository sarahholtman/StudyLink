const modal = document.getElementById("createGroupModal");

const openModalButton =
    document.getElementById("openCreateGroupModal");

const closeModalButton =
    document.getElementById("closeModal");

if (openModalButton) {

    openModalButton.addEventListener("click", function() {
        modal.style.display = "block";
    });
}

if (closeModalButton) {

    closeModalButton.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

window.addEventListener("click", function(event) {

    if (event.target === modal) {
        modal.style.display = "none";
    }
});

const groupResults = document.getElementById("studyGroupResults");
const recommendedGroups = document.getElementById("recommendedGroups");

const searchForm = document.getElementById("groupSearchForm");

var studyGroupStudyGroupCurrentPage = 1;
const groupsPerPage = 10;

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

    const startIndex = (StudyGroupCurrentPage - 1) * groupsPerPage;
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

            <button>Join Group</button>
        `;

        groupResults.appendChild(card);
    });

    const totalPages = Math.ceil(groups.length / groupsPerPage);

    document.getElementById("pageInfo").textContent =
        `Page ${StudyGroupCurrentPage} of ${totalPages || 1}`;

    document.getElementById("prevPage").disabled = StudyGroupCurrentPage === 1;

    document.getElementById("nextPage").disabled =
        StudyGroupCurrentPage >= totalPages;
}

if (searchForm) {

    searchForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const schoolName =
            document.getElementById("filterSchool").value;

        const courseName =
            document.getElementById("filterProgram").value;

        const courseCode =
            document.getElementById("filterCourseCode").value;

        const response = await fetch(
            `/api/study-groups/search?schoolName=${schoolName}&courseName=${courseName}&courseCode=${courseCode}`
        );

        const groups = await response.json();

        StudyGroupCurrentPage = 1;

        displayStudyGroups(groups);
    });
}

document.getElementById("prevPage").addEventListener("click", function() {
    if (StudyGroupCurrentPage > 1) {
        StudyGroupCurrentPage--;
        loadAllStudyGroups();
    }
});

document.getElementById("nextPage").addEventListener("click", function() {
    StudyGroupCurrentPage++;
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
            `/api/study-groups/search?schoolName=${course.school}&courseName=${course.program}&courseCode=${course.courseCode}`
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

            <button>Join Group</button>
        `;

        recommendedGroups.appendChild(card);
    });
}

loadAllStudyGroups();
loadRecommendedGroups();

const createGroupForm =
    document.getElementById("createGroupForm");

if (createGroupForm) {

    createGroupForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const userId = localStorage.getItem("userId");

        const studyGroup = {

            groupName:
                document.getElementById("groupName").value,

            courseCode:
                document.getElementById("groupCourseCode").value,

            schoolName:
                document.getElementById("groupSchool").value,

            courseName:
                document.getElementById("groupCourseName").value,

            section:
                document.getElementById("groupSection").value,

            meetingTime:
                document.getElementById("groupMeetingTime").value,

            description:
                document.getElementById("groupDescription").value,

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

            StudyGroupCurrentPage = 1;

            loadAllStudyGroups();

            loadRecommendedGroups();

        } else {

            alert("Could not create study group.");
        }
    });
}