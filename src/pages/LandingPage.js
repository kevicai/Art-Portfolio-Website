import React, { Component } from 'react';
import "./LandingPage.css";

import ProfileConatiner from "../components/ProfileContainter";
import ArtworkRow from "../components/ArtworkRow";

import landingCover from "../images/landing-cover.png";
import profilePic from "../images/profile-pic.png";
import comm1 from "../images/comm1.png";
import comm2 from "../images/comm2.png";
import work1 from "../images/work1.png";
import work2 from "../images/work2.png";


class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="landing-cover" style={{backgroundImage: `url(${landingCover})`}}></div>

        <ProfileConatiner profilePic={profilePic} 
          aboutTexts={"Hi I'm Cakee/Kevin. I'm a computer science student who draws for fun"}
          contacts={"cakeeiv@gmail.com\nDiscord: cakee#6779"}
          />

        <div className="artworks-page">
          <ArtworkRow imgLeft={work1} imgRight={work2} hoverText="Artworks" navigate="/art/artworks"/>
          <ArtworkRow imgLeft={comm1} imgRight={comm2} hoverText="Commissions" navigate="/art/comms"/>
        </div>

      </div>
    );
  }
}

export default LandingPage;
