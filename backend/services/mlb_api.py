import requests

def get_royals_record():
    url = "https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=2026"
    response = requests.get(url)
    return response.json()

def get_royals_schedule():
    url = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=118&season=2026"
    response = requests.get(url)
    return response.json()

def get_royals_stats():
    return {
        "message": "2026 team stats are not yet available from MLB StatsAPI.",
        "available": False
    }

def get_royals_players():
    url = "https://statsapi.mlb.com/api/v1/teams/118/roster"
    response = requests.get(url)
    return response.json()

def get_player_details(player_id: int):
    url = f"https://statsapi.mlb.com/api/v1/people/{player_id}"
    res = requests.get(url)
    return res.json()