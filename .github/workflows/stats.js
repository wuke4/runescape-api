async function fetchStats() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a username');
        return;
    }

    // Use the Vercel-deployed API to bypass CORS issues
    const apiUrl = `https://runescape-api.vercel.app/api/runescape?username=${encodeURIComponent(username)}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Player not found or an error occurred');
        }

        const data = await response.json();
        displayStats(data);
    } catch (error) {
        alert('Error fetching stats. Please try again later.');
        console.error('Error:', error);
    }
}

function displayStats(data) {
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `<h2>Stats for ${data.name}:</h2>`;

    if (data.error) {
        statsDiv.innerHTML += `<p>Error: ${data.error}</p>`;
        return;
    }

    // Display skills information
    if (data.skillvalues) {
        statsDiv.innerHTML += '<h3>Skills:</h3>';
        data.skillvalues.forEach(skill => {
            statsDiv.innerHTML += `<p>Skill ID ${skill.id}: Level ${skill.level}, XP ${skill.xp}</p>`;
        });
    }

    // Display recent activities
    if (data.activities) {
        statsDiv.innerHTML += '<h3>Recent Activities:</h3>';
        data.activities.forEach(activity => {
            statsDiv.innerHTML += `<p>${activity.date}: ${activity.details}</p>`;
        });
    }
}

