// --------------
// HITTING STATS 
// --------------
async function loadHittingStats() {
    const data = await getJSON("/royals/players");

    // Filter out pitchers
    const hitters = data.roster.filter(p => p.position.abbreviation !== "P");

    // Fetch all hitting stats in parallel
    const statPromises = hitters.map(player =>
        getJSON(`/player/${player.person.id}/stats/hitting`)
    );

    const stats = await Promise.all(statPromises);

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>POS</th>
                    <th>AVG</th>
                    <th>OPS</th>
                    <th>HR</th>
                    <th>RBI</th>
                    <th>SB</th>
                </tr>
            </thead>
            <tbody>
    `;

    hitters.forEach((player, i) => {
        const stat = stats[i]?.stats?.[0]?.splits?.[0]?.stat ?? {};

        html += `
            <tr>
                <td>${player.person.fullName}</td>
                <td>${player.position.abbreviation}</td>
                <td>${stat.avg ?? "—"}</td>
                <td>${stat.ops ?? "—"}</td>
                <td>${stat.homeRuns ?? "—"}</td>
                <td>${stat.rbi ?? "—"}</td>
                <td>${stat.stolenBases ?? "—"}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    document.getElementById("hitting").innerHTML = html;
}

// --------------
// PITCHING STATS
// --------------
async function loadPitchingStats() {
    const data = await getJSON("/royals/players");

    // Only pitchers
    const pitchers = data.roster.filter(p => p.position.abbreviation === "P");

    // Fetch all pitching stats in parallel
    const statPromises = pitchers.map(player =>
        getJSON(`/player/${player.person.id}/stats/pitching`)
    );

    const stats = await Promise.all(statPromises);

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>POS</th>
                    <th>ERA</th>
                    <th>WHIP</th>
                    <th>SO</th>
                    <th>BB</th>
                    <th>IP</th>
                </tr>
            </thead>
            <tbody>
    `;

    pitchers.forEach((player, i) => {
        const stat = stats[i]?.stats?.[0]?.splits?.[0]?.stat ?? {};

        html += `
            <tr>
                <td>${player.person.fullName}</td>
                <td>P</td>
                <td>${stat.era ?? "—"}</td>
                <td>${stat.whip ?? "—"}</td>
                <td>${stat.strikeOuts ?? "—"}</td>
                <td>${stat.baseOnBalls ?? "—"}</td>
                <td>${stat.inningsPitched ?? "—"}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    document.getElementById("pitching").innerHTML = html;
}

// ----------------
// FIELDING STATS 
// ----------------
async function loadFieldingStats() {
    const data = await getJSON("/royals/players");

    // Everyone gets fielding stats
    const players = data.roster;

    // Fetch all fielding stats in parallel
    const statPromises = players.map(player =>
        getJSON(`/player/${player.person.id}/stats/fielding`)
    );

    const stats = await Promise.all(statPromises);

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>POS</th>
                    <th>PO</th>
                    <th>A</th>
                    <th>E</th>
                    <th>FPCT</th>
                </tr>
            </thead>
            <tbody>
    `;

    players.forEach((player, i) => {
        const stat = stats[i]?.stats?.[0]?.splits?.[0]?.stat ?? {};

        html += `
            <tr>
                <td>${player.person.fullName}</td>
                <td>${player.position.abbreviation}</td>
                <td>${stat.putOuts ?? "—"}</td>
                <td>${stat.assists ?? "—"}</td>
                <td>${stat.errors ?? "—"}</td>
                <td>${stat.fielding ?? "—"}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    document.getElementById("fielding").innerHTML = html;
}
