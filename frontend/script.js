const BASE_URL = "http://127.0.0.1:8000";

async function loadRecord() {
    const res = await fetch(`${BASE_URL}/royals/record`);
    const data = await res.json();

    // Find the Royals inside the giant standings array
    const royals = data.records[1].teamRecords.find(
        team => team.team.id === 118
    );

    // Find AL Central (division 202)
    const alCentral = data.records.find(
        record => record.division.id === 202
    );

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>GB</th>
                    <th>Streak</th>
                </tr>
            </thead>
            <tbody>
    `;

    alCentral.teamRecords.forEach(team => {
        const name = team.team.name;
        const wins = team.wins;
        const losses = team.losses;
        const gb = team.gamesBack;
        const rank = team.divisionRank;
        const streak = team.streak.streakCode; // example: W8, L7

        html += `
            <tr>
                <td>${rank}</td>
                <td>${name}</td>
                <td>${wins}</td>
                <td>${losses}</td>
                <td>${gb}</td>
                <td>${streak}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `
    
    document.getElementById("record").innerHTML = html;
}

async function loadSchedule() {
    const res = await fetch(`${BASE_URL}/royals/schedule`);
    const data = await res.json();

    let html = "<ul>";

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
                const royalsScore = (royalsIsAway ? away.score : home.score) ?? "—";
                const oppScore = (royalsIsAway ? home.score : away.score) ?? "—";

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

    let html = "<ul>";

    data.roster.forEach(player => {
        const name = player.person.fullName;
        const number = player.jerseyNumber;
        const pos = player.position.abbreviation;

        html += `
            <li>
                #${number} — ${name} (${pos})
            </li>
        `;
    })

    html += "</ul>";

    document.getElementById("players").innerHTML = html;
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