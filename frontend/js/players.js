async function loadPlayers() {
    const data = await getJSON("/royals/players");

    // Fetch all player details in parallel
    const detailPromises = data.roster.map(player =>
        getJSON(`/player/${player.person.id}`)
    );

    const details = await Promise.all(detailPromises);

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>POS</th>
                    <th>BAT</th>
                    <th>THW</th>
                    <th>AGE</th>
                    <th>HT</th>
                    <th>WT</th>
                    <th>Birth Place</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.roster.forEach((player, i) => {
        const pos = player.position.abbreviation;
        const p = details[i]?.people?.[0];

        if (!p) return; // If not a valid player, skip

        html += `
            <tr>
                <td>${p.fullName}</td>
                <td>${pos}</td>
                <td>${p.batSide?.code ?? "—"}</td>
                <td>${p.pitchHand?.code ?? "—"}</td>
                <td>${p.currentAge ?? "—"}</td>
                <td>${p.height ?? "—"}</td>
                <td>${p.weight ?? "—"}</td>
                <td>${p.birthCity ?? ""}, ${p.birthCountry ?? ""}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    document.getElementById("players").innerHTML = html;
}
