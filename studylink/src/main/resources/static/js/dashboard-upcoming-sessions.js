(() => {
    const userId = localStorage.getItem("userId");
    const container = document.getElementById('upcomingSessionsContainerLimited');

    let allUpcomingSessions = [];

    async function loadUserUpcomingSessions() {
        if (!userId) {
            if (container) {
                container.innerHTML = '<p style="color: red;">Please log in to view your upcoming sessions.</p>';
            }
            return;
        }

        if (container) {
            container.innerHTML = '<p>Loading upcoming sessions...</p>';
        }

        try {
            const membershipsResponse = await fetch(`http://localhost:8080/api/study-groups/user/${userId}`);
            if (!membershipsResponse.ok) throw new Error("Failed to fetch memberships");
            const memberships = await membershipsResponse.json();
            
            if (memberships.length === 0) {
                if (container) container.innerHTML = '<p>You have not joined any study groups yet.</p>';
                return;
            }

            const groupIds = memberships
                .map(m => m.studyGroup ? m.studyGroup.groupId : null)
                .filter(id => id !== null);

            if (groupIds.length === 0) {
                if (container) container.innerHTML = '<p>No valid groups identified.</p>';
                return;
            }

            const sessionPromises = groupIds.map(groupId => 
                fetch(`http://localhost:8080/api/study-sessions/group/${groupId}`)
                    .then(res => res.ok ? res.json() : [])
                    .catch(() => [])
            );
            const arraysOfSessions = await Promise.all(sessionPromises);
            const allSessions = arraysOfSessions.flat();
            const uniqueSessionsMap = new Map();
			
            allSessions.forEach(session => {
                const uniqueKey = session.sessionId || `${session.sessionDate}-${session.sessionTime}-${session.location}`;
                if (!uniqueSessionsMap.has(uniqueKey)) {
                    uniqueSessionsMap.set(uniqueKey, session);
                }
            });

            const todayStr = new Date().toISOString().split('T')[0]; 
            
            allUpcomingSessions = Array.from(uniqueSessionsMap.values())
                .filter(session => session.sessionDate && session.sessionDate >= todayStr)
                .sort((a, b) => new Date(a.sessionDate) - new Date(b.sessionDate));

            renderSessions();

        } catch (error) {
            console.error('Error loading dashboards:', error);
            if (container) {
                container.innerHTML = '<p style="color: red;">Error connecting to network services.</p>';
            }
        }
    }

    function renderSessions() {
        if (!container) return;
        container.innerHTML = '';
        
        if (allUpcomingSessions.length === 0) {
            container.innerHTML = '<p>No upcoming sessions scheduled for your groups.</p>';
            return;
        }
		
		const limitedSessions = allUpcomingSessions.slice(0, 3);
        limitedSessions.forEach(session => {
            const groupName = session.studyGroup ? session.studyGroup.groupName : "Unnamed Study Group";
            
			let formattedDate = session.sessionDate;
			if (session.sessionDate && session.sessionDate.includes('-')) {
			    const [year, month, day] = session.sessionDate.split('-');
			    const dateObj = new Date(year, month - 1, day); 
			    
			    formattedDate = dateObj.toLocaleDateString('en-US', {
			        month: 'short',
			        day: 'numeric',
			        year: 'numeric'
			    });
			}
			
            const card = document.createElement('div');
            card.className = 'list-item';
            card.innerHTML = `
                <h4>${groupName}</h4>
                <p>${formattedDate} | ${session.sessionTime || 'Not Set'} | ${session.location || 'Unknown Location'}</p>
            `;
            container.appendChild(card);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadUserUpcomingSessions);
    } else {
        loadUserUpcomingSessions();
    }
})();
