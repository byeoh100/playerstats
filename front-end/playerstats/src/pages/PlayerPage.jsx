import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { api } from '../utilities'
import axios from 'axios'
import './PlayerPage.css'
import PlayerTable from '../components/PlayerTable';
import Form from 'react-bootstrap/Form'

import imageData from '../assets/players_by_fname.json'

function PlayerPage() {
    const [playerHist, setPlayerHist] = useState([])
    const [playerRecent, setPlayerRecent] = useState({})
    const { name } = useParams()

    const [playerData, setPlayerData] = useState([])
    const [averageData, setAverageData] = useState([])
    const [passAverage, setPassAverage] = useState(true)
    const [playerTeam, setPlayerTeam] = useState('')

    const [playerID, setPlayerID] = useState(null)

    const dataPull = {
        "season": "Season",
        "games": "GP",
        "minutes_played": "MIN",
        "field_goals": "FG",
        "field_attempts": "FGA",
        "field_percent": "FG%",
        "three_fg": "3P",
        "three_attempts": "3PA",
        "three_percent": "3P%",
        "ft": "FT",
        "fta": "FTA",
        "ft_percent": "FT%",
        "ORB": "ORB",
        "DRB": "DRB",
        "AST": "AST",
        "BLK": "BLK",
        "STL": "STL",
        "PF": "PF",
        "TOV": "TOV",
        "PTS": "PTS"
    }

    useEffect(() => {
        const fetchData = async () => {
            let resPlayer = await axios.get(`/playerapi/PlayerDataTotals/name/${name}`)
            setPlayerHist(resPlayer.data)
            setPlayerRecent(resPlayer.data[resPlayer.data.length - 1])

            let firstRes = await axios.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${name}`)
            setPlayerTeam(firstRes.data.results[0].team)
            let formatData = firstRes.data.results.map((i) => {
                let newDict = {}
                Object.keys(dataPull).map((key) => {
                    if (key == "field_percent" || key == "three_percent" || key == "ft_percent") {
                        newDict[dataPull[key]] = (i[key] * 100).toFixed(1)
                    }
                    else {
                        newDict[dataPull[key]] = i[key]
                    }
                })
                return newDict
            })
            setPlayerData(formatData)

            let createAverageData = formatData.map((i) => {
                let newDict = {}
                Object.keys(i).map((key) => {
                    if (key != "Season" && key != "GP" && key.includes("%") == false) {
                        newDict[key] = (i[key] / i.GP).toFixed(1)
                    }
                    else {
                        newDict[key] = i[key]
                    }
                })
                return newDict
            })
            setAverageData(createAverageData)
        }
        fetchData()
        if (imageData[name] != undefined) {
            setPlayerID(imageData[name].playerid)
        }
    }, [])

    const makeFavorite = async () => {
        let response = await api.put("/players/", { player: name });
        if (response.status == 200) {
            alert("Favorite player changed")
        }
    }

    return (
        <div className='page'>
            <div className="title">
                <h2 style={{ whiteSpace: 'nowrap' }}>AllStats / Players / <strong>{name}</strong></h2> <hr />
            </div>
            <div className='content'>
                <Card className='player-card'>
                        <img
                            src={playerID != null ?
                                `../src/assets/img/${playerID}.png`
                                :
                                '../src/assets/defaultplayer.jpg'
                            }
                            width="165"
                            height="130"
                        />
                    <div className='basic-stats'>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            Age: {playerRecent.age}<br />
                            Team: {playerRecent.team} - {playerRecent.position}
                        </Card.Text>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='average-stats'>
                        <Card.Text>PTS</Card.Text>
                        <Card.Title>{(playerRecent.points / playerRecent.games).toFixed(1)}</Card.Title>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='average-stats'>
                        <Card.Text>REB</Card.Text>
                        <Card.Title>{(playerRecent.totalRb / playerRecent.games).toFixed(1)}</Card.Title>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='average-stats'>
                        <Card.Text>AST</Card.Text>
                        <Card.Title>{(playerRecent.assists / playerRecent.games).toFixed(1)}</Card.Title>
                    </div>
                    <div className='vertical-line'></div>
                    <div className='average-stats'>
                        <Card.Text>FG%</Card.Text>
                        <Card.Title>{((playerRecent.fieldPercent) * 100).toFixed(1)}</Card.Title>
                    </div>
                    <Button onClick={() => makeFavorite()} className='ms-auto'>Add to favorites</Button>
                </Card>
            </div>
            <div>
                <Form>
                    <Form.Check
                        type="switch"
                        id="averages"
                        label="Show totals"
                        onChange={() => setPassAverage(!passAverage)}
                    />
                </Form>
                <div className="stats">
                    <PlayerTable fetchedPData={passAverage ? averageData : playerData} />
                </div>
            </div>
        </div>
    )
}

export default PlayerPage