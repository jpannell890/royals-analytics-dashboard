import requests

def get_royals_record():
    url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2026"
    response = requests.get(url)
    return response.json()