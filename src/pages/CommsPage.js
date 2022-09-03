import React, { useState, useEffect } from "react";
import FilterBar from "../components/CommsPage/FilterBar";
import RequestCard from "../components/CommsPage/RequestCard";
import RequestForm from "../components/CommsPage/RequestForm";
import { Container, Row, Col } from "react-bootstrap";
import "./CommsPage.css";
import blogsService from "../services/blogsService";
import userService from "../services/userService";
import authService from "../services/authService";

export default function CommsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [commType, setCommType] = useState([]);
  const [commStage, setCommStage] = useState([]);
  const [commSort, setCommSort] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
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
    const andQueryList = [{ $or: orQueryType }, { $or: orQueryStage }];

    const fetchCurrUserBlogs = async () => {
      if (!authService.checkLogin()) {
        setErrorMsg("You must be logged in to view your requests");
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
        return;
      }

      const blogs = await userService.getCurrUserBlogs();
      if (blogs.length === 0) {
        setErrorMsg("You have no requests, please create one below");
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      }

      setRequests(blogs);
      setAllRequests(blogs);
    };

    const fetchBlogs = async () => {
      const blogs = await blogsService.getAll({
        filterCond: { $and: andQueryList },
        sortCond: { created_at: commSort.includes("Date Old") ? 1 : -1 },
      });

      setRequests(blogs);
      setAllRequests(blogs);
    };

    if (commSort.includes("Your Requests")) {
      fetchCurrUserBlogs();
    } else {
      fetchBlogs();
    }
  }, [commType, commStage, commSort]);

  useEffect(() => {
    if (allRequests.length > 0 && searchInput !== "") {
      setRequests(
        allRequests.filter((request) => request.content.includes(searchInput))
      );
    } else {
      setRequests(allRequests);
    }
  }, [searchInput, allRequests]);

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
        {errorMsg && (
          <div className="req-page-error-msg regular-font container">
            {errorMsg}
          </div>
        )}
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
