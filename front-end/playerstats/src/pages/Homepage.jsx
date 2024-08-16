import React from 'react';
import './Homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';

function Homepage() {
    const { setUser } = useOutletContext()

    return (
        <div className="home-page">
            <div className="search-bar">
                <h1>NBA Statistics tracking,</h1>
                <h1>made&nbsp;<span className='highlight'>visual</span> </h1>
                <div className="search-bar-container">
                    <button className="menu-icon">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for players or teams"
                    />
                    <button className="search-icon">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
            <div className="dashboard">
                <h1>Personalized Statistics</h1>
                <h2>Stay up to date with a <strong>custom dashboard</strong></h2>
                <div className="dashboard-content">
                    <div className="player-tracking">
                        <h3>Player tracking</h3>
                    </div>
                    <div className="team-tracking">
                        <h3>Team tracking</h3>
                    </div>
                    <div className="fantasy-tracking">
                        <h3>Fantasy team tracking</h3>
                    </div>
                    <div className='dashboard-img'>
                        <img src="./src/assets/dashboardsamplepic.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="community-insights">
                <h2>Community Insights</h2>
                <div className="carousel">
                    <button className="carousel-control left">&lt;</button>
                    <div className="carousel-items">
                        <img src="./src/assets/communitysamplepic.png" alt="" />
                    </div>
                    <button className="carousel-control right">&gt;</button>
                </div>
            </div>
        </div>
    )
}

export default Homepage