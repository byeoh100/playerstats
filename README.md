# PlayerStats

A full-stack NBA statistics web app for exploring player and team data, tracking favorites on a personal dashboard, and sharing fantasy lineups with other users.

Built with **React** (Vite) on the front end and a **Django REST Framework** API backed by **PostgreSQL**.

## Features

- **Player explorer**: browse season stats for every NBA player from 2014–15 through 2023–24, with live name search and pagination.
- **Player pages**: career stat tables that toggle between per-game averages and season totals. Click any stat column to plot it on an interactive line chart, and compare several stats at once.
- **Team pages**: all 30 teams grouped by conference with team logos, plus a clickable roster for each team.
- **Accounts**: email/password sign-up and login using token authentication. Sign-ups are screened for disposable email addresses.
- **Personal dashboard**: pin a favorite player (with a stat trend chart) and a favorite team, and build a five-position fantasy lineup using typeahead player search.
- **Community feed**: post your fantasy lineup for other users to see and comment on.
- **Secure API keys**: third-party API calls are proxied through the Django backend so keys never reach the browser.

### Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL

### Backend

```bash
cd playerstats_proj
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

createdb playerstats_db
cp .env.example .env

python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd front-end/playerstats
npm install
npm run dev
```