# Royals Analytics Dashboard

A full-stack MLB analytics dashboard focused on Kansas City Royals statistics, built with Python (FastAPI) and JavaScript.

## Overview
This project is a web-based analytics dashboard that visualizes Kansas City Royals data, including player stats, team performance, and season trends. The goal is to create a clean, interactive interface powered by a FastAPI backend and a lightweight JavaScript frontend.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Planned Features](#planned-features)
- [Status](#status)

## Tech Stack
- Python (FastAPI)
- JavaScript (Vanilla JS)
- HTML & CSS
- MLB statistics APIs (TBD)

## Project Structure
royals-analytics-dashboard/     
│     
├── backend/     
│   ├── app.py      
│   ├── requirements.txt     
│   │     
│   ├── routers/     
│   │   └── royals.py     
│   │     
│   └── services/     
│       └── mlb_api.py     
│     
├── frontend/     
│   ├── index.html     
│   ├── players.html     
│   ├── schedule.html     
│   ├── standings.html     
│   ├── stats.html     
│   │     
│   ├── css/     
│   │   └── style.css     
│   │     
│   ├── images/     
│   │   └── royals-logo.png     
│   │     
│   └── js/     
│       ├── common.js     
│       ├── home.js     
│       ├── players.js     
│       ├── schedule.js     
│       ├── standings.js    
│       └── stats.js    
│     
├── .gitignore     
└── README.md     
## Planned Features
- Kansas City Royals player statistics
- MLB standings
- Updated roster and live game results
- API endpoints for stats retrieval
- Responsive frontend interface

## Status
Project setup complete — initial backend and frontend development complete.
