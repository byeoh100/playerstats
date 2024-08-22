import React from 'react'
import './Community.css'
import {
    Button,
    Card,
    Row,
    Col,
    Form,
    Carousel,
    Pagination
} from "react-bootstrap";
import { useEffect, useState } from 'react';
import { api } from '../utilities';
import playerData from '../assets/players_by_fname.json'
import { useOutletContext } from 'react-router-dom';

function Community() {
    const [userInfo, setUserInfo] = useState({})
    const [allPosts, setAllPosts] = useState([])

    const [newComment, setNewComment] = useState([])
    const [expandComment, setExpandComment] = useState(Array(allPosts.length).fill(false));

    const { user } = useOutletContext()

    const toggleExpandComment = (index) => {
        const updatedExpandComment = [...expandComment];
        updatedExpandComment[index] = !updatedExpandComment[index];
        setExpandComment(updatedExpandComment);
    };

    useEffect(() => {
        const fetchData = async () => {
            let response = await api.get("info/");
            setUserInfo(response.data)
            let resPost = await api.get("posts/all/")
            setAllPosts(resPost.data)
        }
        fetchData()
    }, [])

    const makePost = async () => {
        if (Object.values(userInfo.fantasy_team).includes(null)) {
            alert("You need a full team to make a post")
        }
        else {
            let res = await api.post("/posts/", { fantasy_team: userInfo.fantasy_team })
            let resPost = await api.get("posts/all/")
            setAllPosts(resPost.data)
        }
    }

    const makeComment = async (e, post_id) => {
        e.preventDefault()
        let res = await api.post(`/posts/${post_id}/comments`, { content: newComment })
        let resPost = await api.get("posts/all/")
        setAllPosts(resPost.data)
    }

    const formatDate = (date) => {
        const newDate = new Date(date)
        return newDate.toLocaleString()
    }

    return (
        <div className='page'>
            <div className="banner" />
            <div className="title">
                <h2 style={{ whiteSpace: 'nowrap' }}>Community / <strong>Fantasy Teams</strong></h2> <hr />
            </div>
            {user ? <div className='content'>
                <Card className='post-box'>
                    <div className='filters'>
                        <Button className='me-5' onClick={makePost}>Post my team</Button>
                        <Form.Group className='d-flex align-items-center'>
                            <Form.Label className='me-2 mb-0' style={{ whiteSpace: 'nowrap' }}>Sort by</Form.Label>
                            <Form.Select>
                                <option>Votes</option>
                                <option>Date posted</option>
                            </Form.Select>
                        </Form.Group>
                        <span>Page 1 of 5</span>
                        <Pagination className='mt-auto mb-auto'>
                            <Pagination.First />
                            <Pagination.Prev />
                            <Pagination.Next />
                            <Pagination.Last />
                        </Pagination>
                    </div>
                    {allPosts.map((post, i) => (
                        <Card className='comment'>
                            <Card.Header className='d-flex justify-content-between'>
                                <div className='comment-col'>
                                    <div>
                                        <img
                                            src={`./src/assets/img/${playerData[`${post.team.point_guard}`].playerid}.png`}
                                            width="70"
                                            height="50"
                                        />
                                        <img
                                            src={`./src/assets/img/${playerData[`${post.team.shooting_guard}`].playerid}.png`}
                                            width="70"
                                            height="50"
                                        />
                                        <img
                                            src={`./src/assets/img/${playerData[`${post.team.small_forward}`].playerid}.png`}
                                            width="70"
                                            height="50"
                                        />
                                        <img
                                            src={`./src/assets/img/${playerData[`${post.team.power_forward}`].playerid}.png`}
                                            width="70"
                                            height="50"
                                        />
                                        <img
                                            src={`./src/assets/img/${playerData[`${post.team.center}`].playerid}.png`}
                                            width="70"
                                            height="50"
                                        />
                                    </div>
                                    <span>{post.user} | {formatDate(post.date_created)}</span>
                                </div>
                                <div className='comment-col' id='right'>
                                    +{post.upvotes} / -{post.downvotes}
                                    <img
                                        src='./src/assets/comment.jpg'
                                        width="45"
                                        height="45"
                                        onClick={() => toggleExpandComment(i)}
                                        style={{cursor: "pointer"}}
                                    />
                                </div>
                            </Card.Header>
                            {expandComment[i] ? <Card.Body>
                                {post.comments.map((comment) => (
                                    <Card.Text>
                                        {comment.user} | {formatDate(comment.date_created)}: <strong>{comment.content}</strong>
                                    </Card.Text>
                                ))}
                                <Form className='d-flex' onSubmit={(e) => makeComment(e, post.id)}>
                                    <Form.Control
                                        type="comment"
                                        placeholder="Write a comment"
                                        id="user-comment"
                                        aria-label="user-comment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <Button type='submit'>Post</Button>
                                </Form>
                            </Card.Body>
                                :
                                undefined
                            }
                        </Card>
                    ))}
                </Card>
            </div>
            :
            <h2 id='sign-in-message'>Please sign in to see this page</h2>}
        </div>
    )
}

export default Community