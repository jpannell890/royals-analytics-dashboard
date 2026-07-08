from fastapi import APIRouter
from services.mlb_api import (
    get_royals_record,
    get_royals_schedule,
    get_royals_stats,
    get_royals_players,
    get_player_details
)

router = APIRouter()

@router.get("/royals/record")
def royals_record():
    return get_royals_record()

@router.get("/royals/schedule")
def royals_schedule():
    return get_royals_schedule()

@router.get("/royals/stats")
def royals_stats():
    return get_royals_stats()

@router.get("/royals/players")
def royals_players():
    return get_royals_players()

@router.get("/player/{player_id}")
def player_details(player_id: int):
    return get_player_details(player_id)