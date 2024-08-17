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

function Community() {
  return (
    <div className='page'>
      <div className="banner" />
      <div className="title">
        <h2 style={{ whiteSpace: 'nowrap' }}>Community / <strong>Fantasy Teams</strong></h2> <hr />
      </div>
      <div className='content'>
        <Card className='post-box'>
          <div className='filters'>
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
          <Card className='comment'>
            <Card.Header className='d-flex justify-content-between'>
              <div className='comment-col'>
                <div>
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                </div>
                <span>guyusername1</span>
              </div>
              <div className='comment-col' id='right'>
                +0 / -0
                <img
                  src='./src/assets/comment.jpg'
                  width="45"
                  height="45"
                />
              </div>
            </Card.Header>
          </Card>
          <Card className='comment'>
            <Card.Header className='d-flex justify-content-between'>
              <div className='comment-col'>
                <div>
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                  <img
                    src='./src/assets/defaultplayer.jpg'
                    width="50"
                    height="50"
                  />
                </div>
                <span>guyusername1</span>
              </div>
              <div className='comment-col' id='right'>
                +0 / -0
                <img
                  src='./src/assets/comment.jpg'
                  width="45"
                  height="45"
                />
              </div>
            </Card.Header>
          </Card>
        </Card>
      </div>
    </div>
  )
}

export default Community