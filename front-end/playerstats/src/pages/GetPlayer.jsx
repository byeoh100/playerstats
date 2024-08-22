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
	Pagination,
	Spinner
} from "react-bootstrap";
import { CategoryScale } from 'chart.js'
import { useNavigate } from 'react-router-dom'

function GetPlayer() {
	const [playerName, setPlayerName] = useState('')
	const [players, setPlayers] = useState(null)
	const [pageNum, setPageNum] = useState(1)
	const [maxPage, setMaxPage] = useState(1)
	const [season, setSeason] = useState("2023")
	
	const [textFilter, setTextFilter] = useState('')
	const [displayPlayers, setDisplayPlayers] = useState([])

	const navigate = useNavigate()

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				let res = await axios.get(`https://nba-stats-db.herokuapp.com/api/playerdata/season/${season}/`)
				let pageCount = Math.ceil(await res.data.count / 100)
				setMaxPage((pageCount * 2) - 1)
				let allPlayers = []
				let page = 1
				while (page <= pageCount) {
					let res = await axios.get(`https://nba-stats-db.herokuapp.com/api/playerdata/season/${season}/?page=${page}`)
					allPlayers = ([...allPlayers, ...res.data.results])
					page += 1
				}
				setPlayers(allPlayers)
				setDisplayPlayers(allPlayers)
				console.log(displayPlayers)
			}
			catch {
				console.log("failed")
			}
		}
		fetchData()
	}, [season])

	const handleSubmit = (e) => {
		e.preventDefault()
		setPlayerName(e.target[0].value)
	}

	const searchChange = (e) => {
		const value = e.target.value
		setTextFilter(value)
		setDisplayPlayers(players.filter((i) => i.player_name.toLowerCase().includes(textFilter.toLowerCase())))
		setMaxPage(Math.ceil(displayPlayers.length / 50))
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
								<Form.Select value={season} onChange={(e) => { setSeason(e.target.value) }}>
									<option value="2023">2023-2024</option>
									<option value="2022">2022-2023</option>
									<option value="2021">2021-2022</option>
									<option value="2020">2020-2021</option>
									<option value="2019">2019-2020</option>
									<option value="2018">2018-2019</option>
									<option value="2017">2017-2018</option>
									<option value="2016">2016-2017</option>
									<option value="2015">2015-2016</option>
									<option value="2014">2014-2015</option>
								</Form.Select>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mb-0">Per</Form.Label>
								<Form.Select>
									<option>Game</option>
									<option>Totals</option>
								</Form.Select>
							</Form.Group>
							<Form.Group>
								<Form.Label className="mb-0">Sort by</Form.Label>
								<Form.Select>
									<option>Points</option>
									<option>Alphabetical</option>
								</Form.Select>
							</Form.Group>
						</div>
						<Form id="player-filter" onSubmit={handleSubmit}>
							<Form.Control
								type="search"
								placeholder="Search for a player"
								id="player-filter-search"
								aria-label="Search"
								value={textFilter}
								onChange={searchChange}
							/>
						</Form>
					</Card>
					{players ? <><span>Page {pageNum} of {maxPage}</span>
						<Pagination className='mt-auto mb-auto'>
							<Pagination.First onClick={() => setPageNum(1)} disabled={pageNum == 1} />
							<Pagination.Prev onClick={() => setPageNum(pageNum - 1)} disabled={pageNum == 1} />
							<Pagination.Next onClick={() => setPageNum(pageNum + 1)} disabled={pageNum == maxPage} />
							<Pagination.Last onClick={() => setPageNum(maxPage)} disabled={pageNum == maxPage} />
						</Pagination>
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
									{displayPlayers == null ? undefined : displayPlayers.slice((pageNum - 1) * 50, pageNum * 50).map((i) => (
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
						</Card></>
						:
						<div className='mt-3 mb-3'>
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>}
				</div>
			</div>
		</>
	)
}

export default GetPlayer