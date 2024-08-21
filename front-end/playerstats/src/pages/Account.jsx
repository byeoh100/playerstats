import React from 'react'
import { useEffect, useState } from 'react';
import { api } from '../utilities';
import { Card, CardBody, InputGroup } from 'react-bootstrap';
import './Account.css'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import 'bootstrap-icons/font/bootstrap-icons.css'

function Account() {
    const [userInfo, setUserInfo] = useState({})

    const [image, setImage] = useState()

    const [showName, setShowName] = useState(false)
    const [showEmail, setShowEmail] = useState(false)

    const [newName, setNewName] = useState("")
    const [newEmail, setNewEmail] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get("info/");
            setUserInfo(response.data)
        }
        fetchData()
    }, [])

    const changeName = async (e) => {
        e.preventDefault()
        let res = api.put("info/", {display_name: newName})
        let response = await api.get("info/")
        setUserInfo(response.data)
    }

    const changeEmail = async (e) => {
        e.preventDefault()
        let res = api.put("info/", {email: newEmail})
        let response = await api.get("info/")
        setUserInfo(response.data)
    }

    return (
        <div className='page' id="account-page">
            <div className="title">
                <h2 style={{ whiteSpace: 'nowrap' }}>My Profile / <strong>Account</strong></h2> <hr />
            </div>
            <Card className='account-card'>
                <Card.Header>Account Info</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Display Name: {userInfo.display_name} <i class="bi bi-pencil" onClick={() => setShowName(!showName)} style={{cursor: 'pointer'}}></i>
                        {showName ? <Form onSubmit={changeName}>
                            <InputGroup className="mt-1">
                                <Form.Control
                                    placeholder="New display name"
                                    aria-label="New display name"
                                    aria-describedby="basic-addon2"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon2" type='submit'>
                                    Button
                                </Button>
                            </InputGroup>
                        </Form>
                        :
                        undefined}
                    </Card.Text>
                    <Card.Text>
                        Email: {userInfo.email} <i class="bi bi-pencil" onClick={() => setShowEmail(!showEmail)} style={{cursor: 'pointer'}}></i>
                        {showEmail ? <Form onSubmit={changeEmail}>
                            <InputGroup className="mt-1">
                                <Form.Control
                                    placeholder="New email"
                                    aria-label="New email"
                                    aria-describedby="basic-addon2"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon2" type='submit'>
                                    Button
                                </Button>
                            </InputGroup>
                        </Form>
                        :
                        undefined}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='account-card'>
                <Card.Header>Change profile picture</Card.Header>
                <Card.Body>
                    <Form>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        <Button type='submit'>Confirm</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Account