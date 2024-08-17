import React from 'react'
import "./GetPlayer.css"
import { Dropdown, Table } from 'react-bootstrap'
import TableStats from '../components/TableStats'
import { useState, useEffect } from 'react'
import axios from 'axios'

import {
	Button,
	Card,
	Row,
	Col,
	Form,
	Carousel,
	Pagination
} from "react-bootstrap";
import { CategoryScale } from 'chart.js'

function GetPlayer() {
	const [playerData, setPlayerData] = useState([])
	const [averageData, setAverageData] = useState([])
	const [passAverage, setPassAverage] = useState(true)
	const [playerTeam, setPlayerTeam] = useState('')

	const [playerName, setPlayerName] = useState('')
	const [players, setPlayers] = useState([])

	const dataPull = {
		"player_name": "Name",
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

	console.log(players)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		let firstRes = await axios.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`)
	// 		setPlayerTeam(firstRes.data.results[0].team)
	// 		let formatData = firstRes.data.results.map((i) => {
	// 			let newDict = {}
	// 			Object.keys(dataPull).map((key) => {
	// 				if (key == "field_percent" || key == "three_percent" || key == "ft_percent") {
	// 					newDict[dataPull[key]] = (i[key] * 100).toFixed(1)
	// 				}
	// 				else {
	// 					newDict[dataPull[key]] = i[key]
	// 				}
	// 			})
	// 			return newDict
	// 		})
	// 		setPlayerData(formatData)

	// 		let createAverageData = formatData.map((i) => {
	// 			let newDict = {}
	// 			Object.keys(i).map((key) => {
	// 				if (key != "Season" && key != "GP" && key.includes("%") == false) {
	// 					newDict[key] = (i[key] / i.GP).toFixed(1)
	// 				}
	// 				else {
	// 					newDict[key] = i[key]
	// 				}
	// 			})
	// 			return newDict
	// 		})
	// 		setAverageData(createAverageData)
	// 	}
	// 	if (playerName) {
	// 		setPlayerData([])
	// 		fetchData()
	// 	}
	// }, [playerName])

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res = await axios.get("https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/?page=1")
				setPlayers(res.data.results)
			}
			catch {
				console.log("failed")
			}
		}
		fetchData()
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		setPlayerName(e.target[0].value)
		console.log(playerName)
	}

	return (
		<>
			<div className="page">
				<div className="banner" />
				<div className="title">
					<h2 style={{ whiteSpace: 'nowrap' }}>AllStats / <strong>Players</strong></h2> <hr />
				</div>
				<div className="content">
					<Card className="params">
						<div className="select-menus">
							<Form.Group>
								<Form.Label className="mb-0">Season</Form.Label>
								<Form.Select>
									<option>2023-2024</option>
									<option>2022-2023</option>
								</Form.Select>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mb-0">Per</Form.Label>
								<Form.Select>
									<option>2023-2024</option>
									<option>2022-2023</option>
								</Form.Select>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mb-0">Sort by</Form.Label>
								<Form.Select>
									<option>2023-2024</option>
									<option>2022-2023</option>
								</Form.Select>
							</Form.Group>
						</div>
						<Form id="player-filter" onSubmit={handleSubmit}>
							<Form.Control
								type="search"
								placeholder="Search for a player"
								id="player-filter-search"
								aria-label="Search"
							/>
						</Form>
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
								{players == null ? undefined : players.map((i) => (
									<tr>
										{Object.keys(dataPull).map((cat) => (
											<th>
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
		</>
	)
}

export default GetPlayer