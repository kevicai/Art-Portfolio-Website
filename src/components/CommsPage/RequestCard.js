import React, { useEffect } from "react";
import { useState } from "react";
import "./RequestCard.css";

export default function RequestCard({ request }) {
  const [stageColor, setStageColor] = useState("");
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
  }, [request.stage, stageColor]);

  return (
    <div className="request-card regular-font text-start">
      {" "}
      <div
        className="stage-marker-tag"
        style={{ backgroundColor: stageColor }}
      ></div>
      <div className="stage-marker-txt" style={{ color: stageColor }}>
        {stageTxt}
      </div>
      <div className="request-title">{request.type}</div>
      <div className="request-content">{request.content}</div>
      <a className="request-link" href={request.reference}>
        Additional References
      </a>
    </div>
  );
}
