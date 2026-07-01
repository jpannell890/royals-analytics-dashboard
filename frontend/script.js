const BASE_URL = "http://127.0.0.1:8000";

async function loadRecord() {
    const res = await fetch(`${BASE_URL}/royals/record`);
    const data = await res.json();
    document.getElementById("record").textContent = JSON.stringify(data, null, 2);
}

async function loadSchedule() {
    const res = await fetch(`${BASE_URL}/royals/schedule`);
    const data = await res.json();
    document.getElementById("schedule").textContent = JSON.stringify(data, null, 2);
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