async function loadSchedule() {
    const data = await getJSON("/royals/schedule");

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Opponent</th>
                    <th>Score</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.dates.forEach(day => {
        if (day.date < "2026-03-27") return; // Only regular season games

        day.games.forEach(game => {
            if (game.status.detailedState === "Postponed") return;

            const away = game.teams.away;
            const home = game.teams.home;

            const royalsAway = away.team.id === 118;
            const royalsHome = home.team.id === 118;

            if (royalsAway || royalsHome) {
                const opponent = royalsAway ? home.team.name : away.team.name;
                const royalsScore = (royalsAway ? away.score : home.score) ?? "—";
                const oppScore = (royalsAway ? home.score : away.score) ?? "—";

                let result = "—";
                if (game.status.detailedState === "Final") {
                    result = royalsScore > oppScore ? "W" : "L";
                } else {
                    result = game.status.detailedState;
                }

                const rowClass = result === "W" ? "win" : result === "L" ? "loss" : "";

                html += `
                    <tr class="${rowClass}">
                        <td>${day.date}</td>
                        <td>${opponent}</td>
                        <td>${royalsScore} - ${oppScore}</td>
                        <td>${result}</td>
                    </tr>
                `;
            }
        });
    });

    html += `</tbody></table>`;
    document.getElementById("schedule").innerHTML = html;
}