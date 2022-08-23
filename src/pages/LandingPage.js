import React, { Component } from "react";
import "./LandingPage.css";

import ProfileContainer from "../components/ProfileContainter";
import ArtworkRowBootstrap from "../components/ArtworkRowBootstrap";

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
        <div
          className="landing-cover"
          style={{ backgroundImage: `url(${landingCover})` }}
        >
        </div>

        <ProfileContainer
          profilePic={profilePic}
          aboutTexts={
            "Hi I'm Cakee/Kevin. I'm a computer science student who draws for fun"
          }
          contacts={"cakeeiv@gmail.com\nDiscord: cakee#6779"}
        />

        <div className="artworks-section">
          <ArtworkRowBootstrap
            imgLeft={comm1}
            imgRight={comm2}
            hoverText="Commissions"
            navigate="/comms"
          />
          <ArtworkRowBootstrap
            imgLeft={work1}
            imgRight={work2}
            hoverText="Artworks"
            navigate="/artworks"
          />
        </div>
      </div>
    );
  }
}

export default LandingPage;
