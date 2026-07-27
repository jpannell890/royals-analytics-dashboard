async function loadHomePage() {
    await loadRecord();
    await loadDivisionRank();
}

async function loadRecord() {
    const data = await getJSON("/royals/record");

    // Find the Royals inside the giant standings array
    const royals = data.records[1].teamRecords.find(
        team => team.team.id === 118
    );

    document.getElementById("record").innerHTML = `
        <h3>Current Record</h3>
        <p>${royals.wins} - ${royals.losses}</p>
    `;
}

async function loadDivisionRank() {
    const data = await getJSON("/royals/record");

    // Find the Royals inside the giant standings array
    const royals = data.records[1].teamRecords.find(
        team => team.team.id === 118
    );

    document.getElementById("division-rank").innerHTML = `
        <h3>Division Rank</h3>
        <p>${royals.divisionRank} in AL Central</p>
    `;
}