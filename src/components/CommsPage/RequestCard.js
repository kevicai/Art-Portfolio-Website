import React, { useEffect } from "react";
import { useState } from "react";
import "./RequestCard.css";

export default function RequestCard({ request }) {
  const [stageColor, setStageColor] = useState("");
  const [typeBg, setTypeBg] = useState("");
  const [stageTxt, setStageTxt] = useState("");

  useEffect(() => {
    switch (request.stage) {
      case 0:
        setStageColor("#30DCF3");
        setStageTxt("NEW");
        break;
      case 1:
        setStageColor("#FAB349");
        setStageTxt("IN PROG");
        break;
      default: // case 2
        setStageColor("#EE9797");
        setStageTxt("COMP");
    }

    switch (request.type) {
      case "Profile Picture":
        setTypeBg(
          "linear-gradient(143.02deg, #EFEFEF 1.41%, #F1F1F1 9.18%, #F0E0E0 19.02%, #F3F3F3 34.56%, #D8D8D8 75.9%, #DDCACA 87.91%, #D6D6D6 100.86%)"
        );
        break;
      case "Half Body":
        setTypeBg(
          "linear-gradient(143.02deg, #EFEFEF 1.41%, #F1F1F1 9.18%, #E0EDFF 19.02%, #F3F3F3 34.56%, #D8D8D8 75.9%, #CFD9E8 87.91%, #D6D6D6 100.86%)"
        );
        break;
      default: // case "Full Body":
        setTypeBg(
          "linear-gradient(143.02deg, #EFEFEF 1.41%, #F1F1F1 9.18%, #E5E0FF 19.02%, #F3F3F3 34.56%, #D8D8D8 75.9%, #D2CFE8 87.91%, #D6D6D6 100.86%)"
        );
    }
  }, [request.stage, stageColor, request.type, typeBg]);

  return (
    <div
      className="request-card regular-font text-start"
      style={{ background: typeBg }}
    >
      {" "}
      <div
        className="stage-marker-tag"
        style={{ background: stageColor }}
      ></div>
      <div className="stage-marker-txt" style={{ color: stageColor }}>
        {stageTxt}
      </div>
      <div className="request-title-flex">
        {" "}
        <div className="request-title">{request.type}</div>
        <div className="request-author">by {request.author}</div>
      </div>
      <div className="request-content">{request.content}</div>
      <a className="request-link" href={request.reference}>
        Additional References
      </a>
    </div>
  );
}
