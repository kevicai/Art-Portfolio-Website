import React, { useState } from "react";
import { useEffect } from "react";
import FilterBar from "../components/CommsPage/FilterBar";
import RequestCard from "../components/CommsPage/RequestCard";
import { Container, Row, Col } from "react-bootstrap";
import "./CommsPage.css";

export default function CommsPage() {
  const [searchInput, setSearchInput] = useState("123");
  const [commType, setCommType] = useState([]);
  const [commStage, setCommStage] = useState([]);
  const [commSort, setCommSort] = useState([]);
  const [requests, setRequests] = useState([]);

  const sampleRequests = [
    {
      author: "kevicai",
      content:
        "Bla bla orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      stage: 0,
      type: "Profile Picture",
      reference: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      author: "kevicai",
      content:
        "Bla bla orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      stage: 1,
      type: "Profile Picture",
      reference: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      author: "kevicai",
      content:
        "Bla bla orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
      stage: 2,
      type: "Profile Picture",
      reference: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <div>
      <FilterBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setCommType={setCommType}
        setCommStage={setCommStage}
        setCommSort={setCommSort}
      />
      <Container className="request-section">
        <Row>
          {sampleRequests.map((request, index) => (
            <Col xs={12} md={6} lg={5} xl={4} xxl={3} key={index}>
              <RequestCard request={request} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
