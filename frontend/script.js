const BASE_URL = "http://127.0.0.1:8000";

async function loadRecord() {
    const res = await fetch(`${BASE_URL}/royals/record`);
    const data = await res.json();

    // Find the Royals inside the giant standings array
    const royals = data.records[1].teamRecords.find(
        team => team.team.id === 118
    );

    document.getElementById("record").innerHTML = `
        <table>
            <tr>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win %</th>
            </tr>
            <tr>
                <td>${royals.wins}</td>
                <td>${royals.losses}</td>
                <td>${royals.winningPercentage}</td>
            </tr>
        </table>
    `;
}

async function loadSchedule() {
    const res = await fetch(`${BASE_URL}/royals/schedule`);
    const data = await res.json();

    let html = "<h2>Games</h2><ul>";

    data.dates.forEach(day => {

        if (day.date < "2026-03-27") return;

        day.games.forEach(game => {

            if (game.status.detailedState === "Postponed") return;

            const away = game.teams.away;
            const home = game.teams.home;

            const royalsIsAway = away.team.id === 118;
            const royalsIsHome = home.team.id === 118;

            if (royalsIsAway || royalsIsHome) {
                const opponent = royalsIsAway ? home.team.name : away.team.name;
                const royalsScore = royalsIsAway ? away.score : home.score;
                const oppScore = royalsIsAway ? home.score : away.score;

                const result = game.status.detailedState;

                html += `
                    <li>
                        ${day.date}: Royals ${royalsScore} vs ${opponent} ${oppScore} (${result})
                    </li>
                `;
            }
        })
    })

    html += "</ul>";

    document.getElementById("schedule").innerHTML = html
}

async function loadPlayers() {
    const res = await fetch(`${BASE_URL}/royals/players`);
    const data = await res.json();
    document.getElementById("players").textContent = JSON.stringify(data, null, 2);
}

async function loadStats() {
    const res = await fetch(`${BASE_URL}/royals/stats`);
    const data = await res.json();
    document.getElementById("stats").textContent = JSON.stringify(data, null, 2);
}

loadRecord();
loadSchedule();
loadPlayers();
loadStats();