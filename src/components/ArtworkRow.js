import { useState } from 'react';
import "./ArtworkRow.css";
import "./Fonts.css"
import { useNavigate } from 'react-router-dom';

export default function ArtworkRow (props) {
  return (
    <div className="artwork-row">
      <Artwork image={props.imgLeft} hoverText={props.hoverText} navigate={props.navigate}/>
      <Artwork image={props.imgRight} hoverText={props.hoverText} navigate={props.navigate}/>
    </div>
  )
}
  
const Artwork = (props) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div className='artwork-container' 
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut} 
      onClick={()=>navigate(props.navigate)}> 
      
      <img className="artwork" src={props.image} alt="An Artwork" />
      <div className="artwork-hover" style={{opacity: isHovering ? 0.8 : 0}}></div>
      <div className="regular-font" style={{opacity: isHovering ? 1 : 0}}> {props.hoverText}</div>
    </div>

  )
}
  