import React from 'react';
import "./ProfileContainer.css";

export default function ProfileContainter(props) {
    const handleScroll = (e) => {
        const page2Reached = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (page2Reached) {
            console.log("Bottom")
        }
    }

    return (
        <div className="profile-container" onScroll={handleScroll}>
            <div className="name-header"></div>
            <div className="profile-section">
                <div className="profile-pic" style={{backgroundImage: `url(${props.profilePic})`}}></div>
                <div className="profile-dropdown"></div>
            </div>
        </div>
    );
}
