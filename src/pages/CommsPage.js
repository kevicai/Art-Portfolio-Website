import React, { useState, useEffect } from "react";
import FilterBar from "../components/CommsPage/FilterBar";
import RequestCard from "../components/CommsPage/RequestCard";
import RequestForm from "../components/CommsPage/RequestForm";
import { Container, Row, Col } from "react-bootstrap";
import "./CommsPage.css";
import blogsService from "../services/blogsService";

export default function CommsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [commType, setCommType] = useState([]);
  const [commStage, setCommStage] = useState([]);
  const [commSort, setCommSort] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // TODO: handle search and sort by
    let orQueryType = [...commType.map((val) => ({ type: val }))];
    if (orQueryType.length === 0) {
      orQueryType = [{}];
    }
    let orQueryStage = [
      ...commStage.map((txt) => {
        switch (txt) {
          case "New":
            return { stage: 0 };
          case "In Progress":
            return { stage: 1 };
          default: // case "Completed"
            return { stage: 2 };
        }
      }),
    ];
    if (orQueryStage.length === 0) {
      orQueryStage = [{}];
    }

    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll({
        filterCond: { $and: [{ $or: orQueryType }, { $or: orQueryStage }] },
      });

      setRequests(blogs);
    };

    fetchBlogs();
  }, [commType, commStage]);

  return (
    <div>
      <div id="all-requests">
        <FilterBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setCommType={setCommType}
          setCommStage={setCommStage}
          setCommSort={setCommSort}
        />
        <Container className="request-section">
          <Row>
            {requests.map((request, index) => (
              <Col xs={12} md={6} lg={5} xl={4} xxl={3} key={index}>
                <RequestCard request={request} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div id="make-a-request">
        <RequestForm />
      </div>
    </div>
  );
}
