import React from 'react';
import { useEffect, useState } from "react";
import "./ProfileContainer.css";
import ProfileAbout from './ProfileAbout';

export default function ProfileContainter(props) {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isFollow, setIsFollow] = useState(false);

    const { viewHeight, viewWidth } = useWindowDimensions();

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);
      
    if(scrollPosition + (viewWidth * 0.11) > viewHeight && !isFollow) {
        setIsFollow(true);
    }
    else if (scrollPosition + (viewWidth * 0.11)<= viewHeight && isFollow) {
        setIsFollow(false);
    }
    
    return (
        <div className={`profile-container ${isFollow && "follow"}`}  onScroll={handleScroll}>
            <div className="name-header"></div>
            <ProfileAbout profilePic={props.profilePic} aboutTexts={props.aboutTexts} contacts={props.contacts}/>
        </div>
    );
}

function getWindowDimensions() {
    const { innerWidth: viewWidth, innerHeight: viewHeight } = window;
    return {
        viewWidth,
        viewHeight
    };
}
  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}