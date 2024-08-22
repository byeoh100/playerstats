import React from 'react';
import './Homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useOutletContext } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Homepage() {
    const { setUser } = useOutletContext()

    const Link = ({ id, children, title }) => (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
            <a href="javascript:void(0);">{children}</a>
        </OverlayTrigger>
    );

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
                        <Link title="Specific player statistics for in-depth analysis." id="t-1">
                            <h3>Player tracking</h3>
                        </Link>{' '}
                    </div>
                    <div className="team-tracking">
                        <Link title="Team-tracking for robust and intuitive speculation." id="t-2">
                            <h3>Team tracking</h3>
                        </Link>{' '}
                    </div>
                    <div className="fantasy-tracking">
                        <Link title="Fantasy tracking for all your possbile combinations." id="t-3">
                            <h3>Fantasy team tracking</h3>
                        </Link>{' '}
                    </div>
                    <div className='dashboard-img'>
                        <img src="./src/assets/dashboardsamplepic.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="community-insights">
                <h2>Community Insights</h2>
                <div className="carousel">
                    <div className="carousel-items">
                        <img src="./src/assets/communitysamplepic.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage