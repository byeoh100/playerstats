import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LineChart from './LineChart'
import { Button } from 'react-bootstrap';

function PlayerTable({ fetchedPData = null }) {
    const [playerData, setPlayerData] = useState(null)
    const [cats, setCats] = useState([])
    const [activeCat, setActiveCat] = useState([])
    const [hideChart, setHideChart] = useState(false)

    const color = {
        backgroundColor: '#ADD8E6'
    }

    const abbrev = {
        "Season": "Season",
        "GP": "Games played",
        "MIN": "Minutes played",
        "FG": "Field goals made",
        "FGA": "Field goal attempts",
        "FG%": "Field goal percentage",
        "3P": "Three pointers made",
        "3PA": "Three point attempts",
        "3P%": "Three point percentage",
        "FT": "Free throws made",
        "FTA": "Free throw attempts",
        "FT%": "Free throw percentage",
        "ORB": "Offensive rebounds",
        "DRB": "Defensive rebounds",
        "AST": "Assists",
        "BLK": "Blocks",
        "STL": "Steals",
        "PF": "Personal fouls",
        "TOV": "Turnovers",
        "PTS": "Points"
    }

    useEffect(() => {
        if (fetchedPData.length > 0) {
            setPlayerData(fetchedPData)
            setCats(Object.keys(fetchedPData[0]))
            setActiveCat([])
        }
    }, [fetchedPData])

    const handleActive = (cat) => {
        if (activeCat.includes(cat)) {
            setActiveCat(activeCat.filter((ele) => ele != cat))
        }
        else {
            setActiveCat([...activeCat, cat])
        }
    }

    const AbbrevTooltip = ({ id, children, title }) => (
        <OverlayTrigger delay={{ show: 100, hide: 200 }} overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <th
                onClick={() => (handleActive(id))}
                style={activeCat.includes(id) ? color : undefined}
            >{children}</th>
        </OverlayTrigger>
    )

    return (
        <>
            <div className="border rounded px-3 pt-3" id="statsTable">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {playerData == null ? undefined : cats.map((stat, i) => (
                                <AbbrevTooltip key={i} title={abbrev[stat]} id={stat}>{stat}</AbbrevTooltip>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {playerData == null ? undefined : playerData.map((year, i) => (
                            <tr key={i}>
                                {cats.map((stat, i) => (
                                    <th key={i}
                                        style={activeCat.includes(stat) ? color : undefined}
                                    >{year[stat]}</th>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button variant='dark' onClick={() => setHideChart(!hideChart)}>CHART</Button>
            {hideChart ? undefined : <LineChart pData={playerData} category={activeCat} />}
        </>
    )
}

export default PlayerTable