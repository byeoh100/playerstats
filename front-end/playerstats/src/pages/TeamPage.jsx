import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Table } from 'react-bootstrap'
import { api } from '../utilities'
import axios from 'axios'
import './TeamPage.css'
import * as NBAIcons from 'react-nba-logos'

function PlayerPage() {
    const [roster, setRoster] = useState([])
    const [teamData, setTeamData] = useState("DAL")
    const { name } = useParams()
    
    const TeamIcon = NBAIcons[teamData]

    const teamAbbrev = {
        "Atlanta Hawks": "ATL",
        "Boston Celtics": "BOS",
        "Brooklyn Nets": "BKN",
        "Charlotte Hornets": "CHA",
        "Chicago Bulls": "CHI",
        "Cleveland Cavaliers": "CLE",
        "Dallas Mavericks": "DAL",
        "Denver Nuggets": "DEN",
        "Detroit Pistons": "DET",
        "Golden State Warriors": "GSW",
        "Houston Rockets": "HOU",
        "Indiana Pacers": "IND",
        "LA Clippers": "LAC",
        "Los Angeles Lakers": "LAL",
        "Memphis Grizzlies": "MEM",
        "Miami Heat": "MIA",
        "Milwaukee Bucks": "MIL",
        "Minnesota Timberwolves": "MIN",
        "New Orleans Pelicans": "NOP",
        "New York Knicks": "NYN",
        "Oklahoma City Thunder": "OKC",
        "Orlando Magic": "ORL",
        "Philadelphia 76ers": "PHI",
        "Phoenix Suns": "PHX",
        "Portland Trail Blazers": "POR",
        "Sacramento Kings": "SAC",
        "San Antonio Spurs": "SAS",
        "Toronto Raptors": "TOR",
        "Utah Jazz": "UTA",
        "Washington Wizards": "WAS"
    }

    const dataPull = {
        "playerName": "Name",
        "age": "Age",
        "position": "Position",
        "games": "GP",
    }

    useEffect(() => {
        const fetchData = async () => {
            let resRoster = await axios.get(`/playerapi/PlayerDataTotals/team/${teamAbbrev[name]}`)
            setTeamData(resRoster.data[0].team)
            setRoster(resRoster.data.slice(0, 30).filter((i) => i.season == "2023"))
        }
        fetchData()
    }, [])

    const makeFavorite = async () => {
        let response = await api.put("/teams/", { team: name });
        if (response.status == 200) {
            alert("Favorite team changed")
        }
    }

    return (
        <div className='page'>
            <div className="title">
                <h2 style={{ whiteSpace: 'nowrap' }}>AllStats / Teams / <strong>{name}</strong></h2> <hr />
            </div>
            <div className='content'>
                <Card className='player-card'>
                    <TeamIcon />
                    <div className='basic-stats'>
                        <Card.Title>{name} ({teamAbbrev[name]})</Card.Title>
                    </div>
                    <Button onClick={() => makeFavorite()}>Add to favorites</Button>
                </Card>
                <Card id="stats-table">
                    <Table striped>
                        <thead>
                            <tr>
                                {Object.values(dataPull).map((cat) => (
                                    <th>{cat}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {roster == null ? undefined : roster.map((i) => (
                                <tr>
                                    {Object.keys(dataPull).map((cat) => (
                                        <th onClick={() => navigate(`/players/${i.player_name}`)} style={{ cursor: "pointer" }}>
                                            {i[cat]}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}

export default PlayerPage