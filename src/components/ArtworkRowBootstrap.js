import { useState } from "react";
import "./ArtworkRowBootstrap.css";
import "./Fonts.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function ArtworkRow(props) {
  return (
    <Container className="artwork-row-container">
      <Row>
        <Col xs={12} md={6}>
          <ArtworkCard
            image={props.imgLeft}
            hoverText={props.hoverText}
            navigate={props.navigate}
          />
        </Col>

        <Col xs={12} md={6}>
          <ArtworkCard
            image={props.imgRight}
            hoverText={props.hoverText}
            navigate={props.navigate}
          />
        </Col>
      </Row>
    </Container>
  );
}

const ArtworkCard = (props) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="artwork-card-container"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => navigate(props.navigate)}
    >
      <img className="img-fluid artwork" src={props.image} alt="An Artwork" />
      <div
        className="artwork-hover"
        style={{ opacity: isHovering ? 0.8 : 0 }}
      ></div>
      <div className="regular-font artworkrow-font" style={{ opacity: isHovering ? 1 : 0 }}>
        {" "}
        {props.hoverText}
      </div>
    </div>
  );
};
