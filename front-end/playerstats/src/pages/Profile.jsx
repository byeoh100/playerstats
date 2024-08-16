import React from 'react'
import './Profile.css'

import {
    Button,
    Card,
    Row,
    Col,
} from "react-bootstrap";

import Chart from "chart.js/auto"
import { Line } from "react-chartjs-2"

function Profile() {
    return (
        <>
            <div className="title">
                <h2>MyProfile/<strong>Dashboard</strong></h2> <hr />
            </div>
            <div className='prof-content'>
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
                                <Row>NAME</Row>
                                <Row>TEAM - # - POSITION</Row>
                            </Col>
                            <Col>AVG PTS</Col>
                            <Col>AVG AST</Col>
                            <Col>AVG REB</Col>
                            <Col>AVG FG%</Col>
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
                                <Row>TEAM</Row>
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
                    <Card.Header>
                        <Card.Title>FANTASY TEAM</Card.Title>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <img
                                        src='./src/assets/defaultplayer.jpg'
                                        width="50"
                                        height="50"
                                    />
                                </Col>
                                <Col>
                                    PLAYER
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        src='./src/assets/defaultplayer.jpg'
                                        width="50"
                                        height="50"
                                    />
                                </Col>
                                <Col>
                                    PLAYER
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        src='./src/assets/defaultplayer.jpg'
                                        width="50"
                                        height="50"
                                    />
                                </Col>
                                <Col>
                                    PLAYER
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        src='./src/assets/defaultplayer.jpg'
                                        width="50"
                                        height="50"
                                    />
                                </Col>
                                <Col>
                                    PLAYER
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img
                                        src='./src/assets/defaultplayer.jpg'
                                        width="50"
                                        height="50"
                                    />
                                </Col>
                                <Col>
                                    PLAYER
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card.Header>
                </Card>
            </div>
        </>
    )
}

export default Profile