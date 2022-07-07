import { useState } from 'react';
import "./ArtworkRow.css";
import "./Fonts.css"

export default function ArtworkRow (props) {
    return (
      <div className="artwork-row">
        <Artwork image={props.imgLeft} hoverText={props.hoverText}/>
        <Artwork image={props.imgRight} hoverText={props.hoverText}/>
      </div>
    )
  }
  
  const Artwork = (props) => {
    const [isHovering, setIsHovering] = useState(false);
  
    const handleMouseOver = () => {
      setIsHovering(true);
    };
  
    const handleMouseOut = () => {
      setIsHovering(false);
    };
  
    return (
      <div className='artwork-container' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> 
        <img className="artwork" src={props.image} alt="An Artwork" />
        <div className="artwork-hover" style={{opacity: isHovering ? 0.8 : 0}}></div>
        <div className="regular-font" style={{opacity: isHovering ? 0.8 : 0}}> {props.hoverText}</div>
      </div>
  
    )
}
  