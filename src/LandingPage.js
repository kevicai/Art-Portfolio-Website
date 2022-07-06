import React, { Component } from 'react';
import "./LandingPage.css"

import landingCover from "./images/landing-cover.png";
import profilePic from "./images/profile-pic.png";
import comm1 from "./images/comm1.png";
import comm2 from "./images/comm2.png";
import work1 from "./images/work1.png";
import work2 from "./images/work2.png";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="landing-cover" style={{backgroundImage: `url(${landingCover})`}}></div>

        <div className="profile-container">
          <div className="name-header"></div>
          <div className="profile-section">
            <div className="profile-pic" style={{backgroundImage: `url(${profilePic})`}}></div>
            <div className="profile-dropdown"></div>
          </div>
        </div>

        <ArtworkRow imgLeft={work1} imgRight={work2} hoverText="Works"/>

      </div>
    );
  }
}

const ArtworkRow = (props) => {
  return (
    <div className="artwork-row">
      <Artwork backgroundImage={props.imgLeft}/>
      <Artwork backgroundImage={props.imgRight}/>
    </div>
  )
}

const Artwork = (props) => {
  return (
    <div className="artwork" style={{backgroundImage: `url(${props.backgroundImage})`}}>
      <div className="artwork-hover"></div>
    </div>
  )
}


export default LandingPage;
