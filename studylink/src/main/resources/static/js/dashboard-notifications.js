document.addEventListener("DOMContentLoaded", async () => {

	const notificationsContainerLimited = document.getElementById("notificationsContainerLimited");
    
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
		notificationsContainerLimited.innerHTML = "<p>User not logged in.</p>";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/notifications/user/${userId}`);

        if (!response.ok) {
            throw new Error("Failed to load notifications");
        }

        const notifications = await response.json();

		notificationsContainerLimited.innerHTML = "";

        if (notifications.length === 0) {
			notificationsContainerLimited.innerHTML = "<p>No notifications found.</p>";
            return;
        }

		
		const limitedNotifications = notifications.slice(0, 3);
		
		limitedNotifications.forEach(notification => {

		    const notificationDiv = document.createElement("div");
		    notificationDiv.classList.add("notification");

		    notificationDiv.innerHTML = `
				<h4>${formatNotificationType(notification.type)}</h4>
				<p>${notification.message}</p>
				<small>${notification.dateSent}</small>
		    `;

		    notificationsContainerLimited.appendChild(notificationDiv);
		});

    } catch (error) {
        console.error(error);
		notificationsContainerLimited.innerHTML = "<p>Error loading notifications.</p>";
    }
});