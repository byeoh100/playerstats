import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Spinner } from 'react-bootstrap'

import './GetTeam.css'
import { useNavigate } from 'react-router-dom'

import * as NBAIcons from 'react-nba-logos'

function GetTeam() {
  const [teams, setTeams] = useState(null)
  const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_BALLDONTLIE_KEY

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get("https://api.balldontlie.io/v1/teams", {
          headers: {
            "Authorization": `${apiKey}`
          }
        })
        setTeams(res.data.data)
      }
      catch {
        console.log("failed")
      }
    }
    fetchData()
  }, [])

  return (
    <div className='page'>
      <div className="title">
        <h2 style={{ whiteSpace: 'nowrap' }}>AllStats / <strong>Teams</strong></h2> <hr />
      </div>
      <div className='content'>
        {teams ? <div id='all-teams'>
          <Card className='conference'>
            <Card.Header>Western Conference</Card.Header>
            <Card.Body className='team-list'>
              {teams.map((team) => {
                if (team.conference == 'West') {
                  const TeamIcon = NBAIcons[team.abbreviation]

                  return (
                    <Card className='d-flex align-items-center' id='team-card' onClick={() => navigate(`/teams/${team.full_name}`)} style={{ cursor: "pointer" }}>
                      <TeamIcon size={50} />
                      <Card.Title>{team.full_name}</Card.Title>
                    </Card>
                  )
                }
              })}
            </Card.Body>
          </Card>
          <Card className='conference'>
            <Card.Header>Eastern Conference</Card.Header>
            <Card.Body className='team-list'>
              {teams.map((team) => {
                if (team.conference == 'East') {
                  const TeamIcon = NBAIcons[team.abbreviation]

                  return (
                    <Card className='d-flex align-items-center' id='team-card' onClick={() => navigate(`/teams/${team.full_name}`)} style={{ cursor: "pointer" }}>
                      <TeamIcon size={50} />
                      <Card.Title>{team.full_name}</Card.Title>
                    </Card>
                  )
                }
              })}
            </Card.Body>
          </Card>
        </div>
          :
          <div className='mt-3 mb-3'>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>}
      </div>
    </div>
  )
}

export default GetTeam