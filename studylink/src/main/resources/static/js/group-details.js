const params = new URLSearchParams(window.location.search);
const groupId = params.get("groupId");

const leaveGroupModal = document.getElementById("leaveGroupModal");

const leaveSuccessModal = document.getElementById("leaveSuccessModal");

const confirmLeaveGroupButton = document.getElementById(
  "confirmLeaveGroupButton",
);

const cancelLeaveGroupButton = document.getElementById(
  "cancelLeaveGroupButton",
);

const returnToDashboardButton = document.getElementById(
  "returnToDashboardButton",
);

const resourceForm = document.getElementById("resourceForm");

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
}

async function loadGroupMembers() {
  const response = await fetch(`/api/study-groups/${groupId}/members`);

  if (!response.ok) {
    document.getElementById("groupMembers").innerHTML =
      "<p>Could not load group members.</p>";
    return;
  }

  const memberships = await response.json();

  const groupMembers = document.getElementById("groupMembers");
  groupMembers.innerHTML = "";

  if (memberships.length === 0) {
    groupMembers.innerHTML = "<p>No members found.</p>";
    return;
  }

  memberships.forEach((membership) => {
    const user = membership.user;

    const memberItem = document.createElement("div");
    memberItem.classList.add("member-item");

    memberItem.innerHTML = `
            <div class="member-avatar">
                👤
            </div>

            <div>
                <h3>${user.name || "Student"}</h3>
                <p>${user.email || "No email provided"}</p>
            </div>
        `;

    groupMembers.appendChild(memberItem);
  });
}

async function loadGroupResources() {
  const response = await fetch(`/api/resources/group/${groupId}`);

  if (!response.ok) {
    document.getElementById("groupResources").innerHTML =
      "<p>Could not load resources.</p>";
    return;
  }

  const resources = await response.json();

  const groupResources = document.getElementById("groupResources");
  groupResources.innerHTML = "";

  if (resources.length === 0) {
    groupResources.innerHTML = "<p>No resources shared yet.</p>";
    return;
  }

  resources.forEach((resource) => {
    const item = document.createElement("div");
    item.classList.add("list-item");

    item.innerHTML = `
            <h3>${resource.fileName || "Shared Resource"}</h3>
            <p>${resource.fileType || "Resource"}</p>
            <p>Shared on ${resource.uploadDate || "Unknown date"}</p>
            <a href="${resource.resourceUrl}" target="_blank">
                Open Resource
            </a>
        `;

    groupResources.appendChild(item);
  });
}

if (resourceForm) {
  resourceForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      window.location.href = "/login.html";
      return;
    }

    const resource = {
      fileName: document.getElementById("resourceName").value,
      resourceUrl: document.getElementById("resourceUrl").value,
      fileType: document.getElementById("resourceType").value,
      studyGroup: {
        groupId: groupId,
      },
      uploadedBy: {
        userId: userId,
      },
    };

    const response = await fetch("/api/resources", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(resource),
    });

    if (response.ok) {
      resourceForm.reset();
      loadGroupResources();
    } else {
      alert("Could not share resource.");
    }
  });
}

function loadPlaceholderNotifications() {
  const notifications = [];

  const groupNotifications = document.getElementById("groupNotifications");
  const viewAllButton = document.getElementById("viewAllNotificationsButton");

  groupNotifications.innerHTML = "";

  if (notifications.length === 0) {
    groupNotifications.innerHTML = "<p>No notifications yet.</p>";
    return;
  }

  notifications.slice(0, 10).forEach((notification) => {
    const item = document.createElement("div");
    item.classList.add("list-item");

    item.innerHTML = `
            <h3>${notification.title}</h3>
            <p>${notification.message}</p>
        `;

    groupNotifications.appendChild(item);
  });

  if (notifications.length > 10) {
    viewAllButton.classList.remove("hidden-button");
  }
}

function loadPlaceholderSessions() {
  const sessions = [];

  const upcomingSessions = document.getElementById("upcomingSessions");
  const viewAllButton = document.getElementById("viewAllSessionsButton");

  upcomingSessions.innerHTML = "";

  if (sessions.length === 0) {
    upcomingSessions.innerHTML = "<p>No upcoming sessions yet.</p>";
    return;
  }

  sessions.slice(0, 10).forEach((session) => {
    const item = document.createElement("div");
    item.classList.add("list-item");

    item.innerHTML = `
            <h3>${session.sessionDate}</h3>
            <p>${session.sessionTime}</p>
            <p>${session.location}</p>
        `;

    upcomingSessions.appendChild(item);
  });

  if (sessions.length > 10) {
    viewAllButton.classList.remove("hidden-button");
  }
}

document
  .getElementById("createSessionButton")
  .addEventListener("click", function () {
    alert("Create Study Session to be added.");
  });

document
  .getElementById("viewMembersButton")
  .addEventListener("click", function () {
    document.getElementById("groupMembers").scrollIntoView({
      behavior: "smooth",
    });
  });

document
  .getElementById("leaveGroupButton")
  .addEventListener("click", function () {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      window.location.href = "/login.html";
      return;
    }

    leaveGroupModal.style.display = "block";
  });

cancelLeaveGroupButton.addEventListener("click", function () {
  leaveGroupModal.style.display = "none";
});

confirmLeaveGroupButton.addEventListener("click", async function () {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    window.location.href = "/login.html";
    return;
  }

  const response = await fetch(`/api/study-groups/${groupId}/leave/${userId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    leaveGroupModal.style.display = "none";
    leaveSuccessModal.style.display = "block";
  } else {
    leaveGroupModal.style.display = "none";
    alert("Could not leave this study group.");
  }
});

returnToDashboardButton.addEventListener("click", function () {
  window.location.href = "dashboard.html";
});

window.addEventListener("click", function (event) {
  if (event.target === leaveGroupModal) {
    leaveGroupModal.style.display = "none";
  }
});

loadGroupDetails();
loadGroupMembers();
loadGroupResources();
loadPlaceholderNotifications();
loadPlaceholderSessions();
