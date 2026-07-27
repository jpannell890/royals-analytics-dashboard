// Base API URL
const BASE_URL = "http://127.0.0.1:8000";

// Simple helper for GET requests
async function getJSON(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    return res.json();
}