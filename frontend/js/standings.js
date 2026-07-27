async function loadDivision() {
    const data = await getJSON("/royals/record");

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
        html += `
            <tr>
                <td>${team.divisionRank}</td>
                <td>${team.team.name}</td>
                <td>${team.wins}</td>
                <td>${team.losses}</td>
                <td>${team.gamesBack}</td>
                <td>${team.streak.streakCode}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    document.getElementById("central").innerHTML = html;
}

async function loadLeague() {
    const data = await getJSON("/royals/record");

    const americanLeague = [
        ...data.records[0].teamRecords,
        ...data.records[1].teamRecords,
        ...data.records[2].teamRecords
    ];

    // Sort the teams from best to worst (neg: a comes first)
    americanLeague.sort((a, b) => a.leagueRank - b.leagueRank);

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Streak</th>
                </tr>
            </thead>
            <tbody>
    `;

    americanLeague.forEach(team => {
        html += `
            <tr>
                <td>${team.leagueRank}</td>
                <td>${team.team.name}</td>
                <td>${team.wins}</td>
                <td>${team.losses}</td>
                <td>${team.streak.streakCode}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    document.getElementById("american").innerHTML = html;
}