document.addEventListener("DOMContentLoaded", async () => {

    const notificationsContainer = document.getElementById("notificationsContainer");

    const userId = localStorage.getItem("userId");
	
	function formatNotificationType(type) {

	    const typeMap = {
	        GROUP_UPDATE: "Group Update",
	        NEW_MESSAGE: "New Message",
	        SESSION_REMINDER: "Session Reminder"
	    };
	    return typeMap[type] || type;
	}

    if (!userId) {
        notificationsContainer.innerHTML = "<p>User not logged in.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/notifications/user/${userId}`);

        if (!response.ok) {
            throw new Error("Failed to load notifications");
        }

        const notifications = await response.json();

        notificationsContainer.innerHTML = "";

        if (notifications.length === 0) {
            notificationsContainer.innerHTML = "<p>No notifications found.</p>";
            return;
        }

        notifications.forEach(notification => {
            const notificationDiv = document.createElement("div");
            notificationDiv.classList.add("notification");

            notificationDiv.innerHTML = `
				<h4>${formatNotificationType(notification.type)}</h4>
                <p>${notification.message}</p>
                <small>${notification.dateSent}</small>
            `;

            notificationsContainer.appendChild(notificationDiv);
        });

    } catch (error) {
        console.error(error);
        notificationsContainer.innerHTML = "<p>Error loading notifications.</p>";
    }
});