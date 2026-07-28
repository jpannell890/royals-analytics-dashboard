async function loadHomePage() {
    await loadRecord();
    await loadDivisionRank();
    await loadTodayGame();
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
        <p>${royals.divisionRank}th in AL Central</p>
    `;
}

async function loadTodayGame() {
    const data = await getJSON("/royals/schedule");

    // Get today's date in the format of YYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    const todayGames = data.dates.find(d => d.date === today);

    if (!todayGames) {
        document.getElementById("today-game").innerHTML = `
            <h3>Today's Game</h3>
            <p>No game today.</p>
        `;
        return;
    }

    const game = todayGames.games[0];

    let opponent;
    let side;

    if (game.teams.away.team.name === "Kansas City Royals") {
        opponent = game.teams.home.team.name;
        side = "away";
    } else {
        opponent = game.teams.away.team.name;
        side = "home";
    }

    const date = new Date(game.gameDate).toLocaleString();

    if (side === "away") {
        document.getElementById("today-game").innerHTML = `
            <h3>Today's Game</h3>
            <p>Royals @ ${opponent}</p>
            <p>${date}</p>
        `;
    } else {
        document.getElementById("today-game").innerHTML = `
            <h3>Today's Game</h3>
            <p>${opponent} @ Royals</p>
            <p>${date}</p>
        `;
    }
}