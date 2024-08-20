import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'

import './GetTeam.css'
import { useNavigate } from 'react-router-dom'

function GetTeam() {
  const [teams, setTeams] = useState([])

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

  let allTeam = teams.map((i) => {
    if(i.city != "") {
      return i.full_name
    }
  })
  console.log(allTeam)

  return (
    <div className='page'>
      <div className="title">
        <h2 style={{ whiteSpace: 'nowrap' }}>AllStats / <strong>Teams</strong></h2> <hr />
      </div>
      <div className='content'>
        <div id='all-teams'>
          <Card className='conference'>
            <Card.Header>Western Conference</Card.Header>
            <Card.Body className='team-list'>
              {teams.map((team) => {
                if (team.conference == 'West') {
                  return (
                    <Card className='d-flex align-items-center' onClick={() => navigate(`/teams/${team.full_name}`)} style={{cursor: "pointer"}}>
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
                  return (
                    <Card className='d-flex align-items-center' onClick={() => navigate(`/teams/${team.full_name}`)} style={{cursor: "pointer"}}>
                      <Card.Title>{team.full_name}</Card.Title>
                    </Card>
                  )
                }
              })}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default GetTeam