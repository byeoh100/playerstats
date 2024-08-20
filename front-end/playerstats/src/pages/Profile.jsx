import React, { useEffect, useState } from 'react'
import './Profile.css'

import {
    Button,
    Card,
    Row,
    Col,
    Form,
} from "react-bootstrap";

import Chart from "chart.js/auto"
import { Line } from "react-chartjs-2"
import { confirmUser } from '../utilities';
import { api } from '../utilities';
import axios from 'axios';
import playerData from '../assets/players_by_fname.json'
import { TOR } from 'react-nba-logos'
import { Typeahead } from 'react-bootstrap-typeahead';

import { makeGList, makeFList, makeCList } from '../utilities'

function Profile() {
    const [userInfo, setUserInfo] = useState({})
    const [favPlayerInfo, setFavPlayerInfo] = useState(null)
    const [favPlayerID, setFavPlayerID] = useState({})
    const [favTeam, setFavTeam] = useState(null)
    const [loading, setLoading] = useState(true)

    const [selectedPG, setSelectedPG] = useState("")
    const [selectedSG, setSelectedSG] = useState("")
    const [selectedSF, setSelectedSF] = useState("")
    const [selectedPF, setSelectedPF] = useState("")
    const [selectedC, setSelectedC] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get("info/");
            setUserInfo(response.data)
            let favPlayer = response.data.fav_player.player
            setFavPlayerID(playerData[`${favPlayer}`])
            let resPlayer = await axios.get(`/playerapi/PlayerDataTotals/name/${favPlayer}`)
            setFavPlayerInfo(resPlayer.data[resPlayer.data.length - 1])
            console.log(resPlayer.data[resPlayer.data.length - 1])
            setFavTeam(response.data.fav_team.team)
            setLoading(false)
        }
        fetchData()
    }, [])

    const updateFantasyTeam = async (e) => {
        e.preventDefault()
        if (selectedPG != "") {
            let res = await api.put("/fantasy_team/point_guard/", { point_guard: selectedPG[0] })
        }
        if (selectedSG != "") {
            let res = await api.put("/fantasy_team/shooting_guard/", { shooting_guard: selectedSG[0] })
        }
        if (selectedSF != "") {
            let res = await api.put("/fantasy_team/small_forward/", { small_forward: selectedSF[0] })
        }
        if (selectedPF != "") {
            let res = await api.put("/fantasy_team/power_forward/", { power_forward: selectedPF[0] })
        }
        if (selectedC != "") {
            let res = await api.put("/fantasy_team/center/", { center: selectedC[0] })
        }
        location.reload()
    }

    return (
        <div className='page'>
            <div className="title">
                <h2 style={{ whiteSpace: 'nowrap' }}>My Profile / <strong>Dashboard</strong></h2> <hr />
            </div>
            {loading ? undefined : <div className='prof-content'>
                <Card className='stats'>
                    <Card.Header id='prof-card'>
                        <img
                            src={`../src/assets/img/${favPlayerID.playerid}.png`}
                            width="100"
                            height="75"
                        />
                        <div className='basic-stats'>
                            <Card.Title>{favPlayerInfo.playerName}</Card.Title>
                            <Card.Text>
                                Age: {favPlayerInfo.age}<br />
                                Team: {favPlayerInfo.team} ({favPlayerInfo.position})
                            </Card.Text>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='average-stats'>
                            <Card.Text>PTS</Card.Text>
                            <Card.Title>{(favPlayerInfo.points / favPlayerInfo.games).toFixed(2)}</Card.Title>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='average-stats'>
                            <Card.Text>REB</Card.Text>
                            <Card.Title>{(favPlayerInfo.totalRb / favPlayerInfo.games).toFixed(2)}</Card.Title>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='average-stats'>
                            <Card.Text>AST</Card.Text>
                            <Card.Title>{(favPlayerInfo.assists / favPlayerInfo.games).toFixed(2)}</Card.Title>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='average-stats'>
                            <Card.Text>FG%</Card.Text>
                            <Card.Title>{(favPlayerInfo.fieldPercent * 100).toFixed(2)}</Card.Title>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Line
                            data={{
                                labels: [1, 2, 3, 4, 5],
                                datasets: [1]
                            }}
                        />
                    </Card.Body>
                </Card>
                <Card className='stats'>
                    <Card.Header>
                        <Row>
                            <Col>
                                <img
                                    src='./src/assets/defaultplayer.jpg'
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col>
                                <TOR size={60} />
                                <Row style={{ whiteSpace: 'nowrap' }}>{favTeam}</Row>
                                <Row>RANKING - DIVISION</Row>
                            </Col>
                            <Col>WIN</Col>
                            <Col>LOSS</Col>
                        </Row>
                        <Card.Body>
                            <Line
                                data={{
                                    labels: [1, 2, 3, 4, 5],
                                    datasets: [1]
                                }}
                            />
                        </Card.Body>
                    </Card.Header>
                </Card>
                <Card className='fantasy-team'>
                    <Form onSubmit={updateFantasyTeam}>
                        <Card.Header>
                            <Card.Title>FANTASY TEAM</Card.Title>
                            <Card.Text>Modify</Card.Text>
                            <Button type='submit'>Confirm changes</Button>
                        </Card.Header>
                        <Card.Body className='player-box'>
                            <div className='fantasy-team-player'>
                                <img
                                    src={userInfo.fantasy_team.point_guard == null ?
                                        './src/assets/defaultplayer.jpg'
                                        :
                                        `./src/assets/img/${playerData[`${userInfo.fantasy_team.point_guard}`].playerid}.png`}
                                    width="100"
                                    height="75"
                                />
                                <div>
                                    <Card.Title>
                                        {userInfo.fantasy_team.point_guard == null ?
                                            "Select Player"
                                            :
                                            userInfo.fantasy_team.point_guard}
                                    </Card.Title>
                                    <Form.Group>
                                        <Typeahead
                                            id='point-guard'
                                            labelKey={(option) => `${option}`}
                                            options={makeGList()}
                                            placeholder='Point Guard'
                                            onChange={setSelectedPG}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='fantasy-team-player'>
                                <img
                                    src={userInfo.fantasy_team.shooting_guard == null ?
                                        './src/assets/defaultplayer.jpg'
                                        :
                                        `./src/assets/img/${playerData[`${userInfo.fantasy_team.shooting_guard}`].playerid}.png`}
                                    width="100"
                                    height="75"
                                />
                                <div>
                                    <Card.Title>
                                        {userInfo.fantasy_team.shooting_guard == null ?
                                            "Select Player"
                                            :
                                            userInfo.fantasy_team.shooting_guard}
                                    </Card.Title>
                                    <Form.Group>
                                        <Typeahead
                                            id='shooting-guard'
                                            labelKey={(option) => `${option}`}
                                            options={makeGList()}
                                            placeholder='Shooting Guard'
                                            onChange={setSelectedSG}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='fantasy-team-player'>
                                <img
                                    src={userInfo.fantasy_team.small_forward == null ?
                                        './src/assets/defaultplayer.jpg'
                                        :
                                        `./src/assets/img/${playerData[`${userInfo.fantasy_team.small_forward}`].playerid}.png`}
                                    width="100"
                                    height="75"
                                />
                                <div>
                                    <Card.Title>
                                        {userInfo.fantasy_team.small_forward == null ?
                                            "Select Player"
                                            :
                                            userInfo.fantasy_team.small_forward}
                                    </Card.Title>
                                    <Form.Group>
                                        <Typeahead
                                            id='small_forward'
                                            labelKey={(option) => `${option}`}
                                            options={makeFList()}
                                            placeholder='Small Forward'
                                            onChange={setSelectedSF}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='fantasy-team-player'>
                                <img
                                    src={userInfo.fantasy_team.power_forward == null ?
                                        './src/assets/defaultplayer.jpg'
                                        :
                                        `./src/assets/img/${playerData[`${userInfo.fantasy_team.power_forward}`].playerid}.png`}
                                    width="100"
                                    height="75"
                                />
                                <div>
                                    <Card.Title>
                                        {userInfo.fantasy_team.power_forward == null ?
                                            "Select Player"
                                            :
                                            userInfo.fantasy_team.power_forward}
                                    </Card.Title>
                                    <Form.Group>
                                        <Typeahead
                                            id='power_forward'
                                            labelKey={(option) => `${option}`}
                                            options={makeFList()}
                                            placeholder='Power Forward'
                                            onChange={setSelectedPF}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='fantasy-team-player'>
                                <img
                                    src={userInfo.fantasy_team.center == null ?
                                        './src/assets/defaultplayer.jpg'
                                        :
                                        `./src/assets/img/${playerData[`${userInfo.fantasy_team.center}`].playerid}.png`}
                                    width="100"
                                    height="75"
                                />
                                <div>
                                    <Card.Title>
                                        {userInfo.fantasy_team.center == null ?
                                            "Select Player"
                                            :
                                            userInfo.fantasy_team.center}
                                    </Card.Title>
                                    <Form.Group>
                                        <Typeahead
                                            id='center'
                                            labelKey={(option) => `${option}`}
                                            options={makeCList()}
                                            placeholder='Center'
                                            onChange={setSelectedC}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Card.Body>
                    </Form>
                </Card>
            </div>}
        </div>
    )
}

export default Profile