import React from 'react'
import { useEffect, useState } from 'react';
import { api } from '../utilities';
import { Card, CardBody } from 'react-bootstrap';
import './Account.css'
import { Button, Form } from 'react-bootstrap';

function Account() {
    const [userInfo, setUserInfo] = useState({})

    const [image, setImage] = useState()

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get("info/");
            setUserInfo(response.data)
            console.log(response.data)
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(image)
    }

    return (
        <div className='page'>
            <div className="title">
                <h2 style={{ whiteSpace: 'nowrap' }}>My Profile / <strong>Account</strong></h2> <hr />
            </div>
            <Card className='account-card'>
                <Card.Header>Account Info</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Display Name: {userInfo.display_name}<br />
                        Email: {userInfo.email}<br />
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className='account-card'>
                <Card.Header>Change profile picture</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                        <Button type='submit'>Confirm</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Account