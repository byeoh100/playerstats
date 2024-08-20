import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { api } from '../utilities'
import axios from 'axios'
import './PlayerPage.css'

function PlayerPage() {
    const [playerHist, setPlayerHist] = useState([])
    const [playerRecent, setPlayerRecent] = useState({})
    const { name } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            let resPlayer = await axios.get(`/playerapi/PlayerDataTotals/name/${name}`)
            console.log(resPlayer.data)
            setPlayerHist(resPlayer.data)
            setPlayerRecent(resPlayer.data[resPlayer.data.length - 1])
        }
        fetchData()
        console.log(playerRecent)
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
                        src='../src/assets/defaultplayer.jpg'
                        width="120"
                        height="120"
                    />
                    <div className='basic-stats'>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            Age: {playerRecent.age}<br/>
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
                        <Card.Title>{((playerRecent.fieldPercent)*100).toFixed(1)}</Card.Title>
                    </div>
                </Card>
            </div>
            <Button onClick={() => makeFavorite()}>Add to favorites</Button>
        </div>
    )
}

export default PlayerPage