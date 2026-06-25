from fastapi import APIRouter
from services.mlb_api import get_royals_record

router = APIRouter()

@router.get("/royals/record")
def royals_record():
    return get_royals_record()
