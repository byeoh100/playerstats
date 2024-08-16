import React from 'react'
import "./GetPlayer.css"
import { Dropdown, Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import TableStats from '../components/TableStats'
import { useState, useEffect } from 'react'
import axios from 'axios'

function GetPlayer() {
	const [playerData, setPlayerData] = useState([])
	const [averageData, setAverageData] = useState([])
	const [passAverage, setPassAverage] = useState(true)
	const [playerTeam, setPlayerTeam] = useState('')
	const [playerName, setPlayerName] = useState('')

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
			let firstRes = await axios.get(`https://nba-stats-db.herokuapp.com/api/playerdata/name/${playerName}`)
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
		if (playerName) {
			setPlayerData([])
			fetchData()
		}
	}, [playerName])

	const handleSubmit = (e) => {
		e.preventDefault()
		setPlayerName(e.target[0].value)
		console.log(playerName)
	}

	return (
		<>
			<div className="banner" />
			<div className="title">
				<h2>AllStats/<strong>Players</strong></h2> <hr />
			</div>
			<div className="content">
				<div className="params">
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
					<Form className="d-flex" onSubmit={handleSubmit}>
						<Form.Control
							type="search"
							placeholder="Search for a player"
							className="mt-4"
							aria-label="Search"
						/>
					</Form>
				</div>
				<TableStats fetchedPData={playerData} />
			</div>
		</>
	)
}

export default GetPlayer