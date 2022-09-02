import React, { useState } from "react";
import "./RequestForm.css";
import authService from "../../services/authService";
import { requestTypes } from "../../utils/constants";

export default function RequestForm() {
  const [radioSelected, setRadioSelected] = useState("");
  const [details, setDetails] = useState("");
  const [refLink, setRefLink] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [typeError, settypeError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const HandleRadioBtn = (event) => {
    setRadioSelected(event.target.value);
  };

  const HandleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const HandleLinkChange = (event) => {
    setRefLink(event.target.value);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();

    const isLogin = authService.checkLogin();
    setLoginError(!isLogin);
    if (!isLogin) {
      return;
    }

    const isTypeEmpty = radioSelected === "";
    const isDetailsEmpty = details === "";
    settypeError(isTypeEmpty);
    setDetailsError(isDetailsEmpty);

    if (isTypeEmpty || isDetailsEmpty) {
      return;
    }

    let formData = new FormData();
    formData.append("author");

    setRadioSelected("");
    setDetails("");
    setRefLink("");
    console.log("submit");
  };

  return (
    <div
      className="req-form-background regular-font"
      style={{ textAlign: "start" }}
    >
      <div className="req-form-title container">
        I'd like to make a request! :D
      </div>

      <div className="req-form">
        <div className="req-form-banner" />
        <div className="req-form-content container">
          <form>
            <div className="req-form-header">Request Type *</div>
            <div className="req-form-disclaimer">
              Prices are in USD! Final price may vary due to complex character
              design or background
            </div>
            <div className="row">
              {requestTypes.map((type) => (
                <div
                  className="req-form-radio-group col-lg-4 col-md-6"
                  key={type.type}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type.type}
                    id={type.type}
                    className="req-form-radio-btn"
                    onChange={HandleRadioBtn}
                  ></input>
                  <label htmlFor={type.type}>
                    {type.type}{" "}
                    <div className="req-form-label-price">{type.price}</div>
                  </label>
                </div>
              ))}
            </div>
            {typeError && <div className="req-form-error">Required!</div>}

            <div className="req-form-header">Request Details *</div>
            <textarea
              className="req-form-input-details container"
              maxLength="250"
              value={details}
              onChange={HandleDetailsChange}
            ></textarea>
            {detailsError && <div className="req-form-error">Required!</div>}

            <div className="req-form-header">Reference Link</div>
            <div className="req-form-disclaimer">
              Please provide a google drive folder link or an image link
            </div>
            <input
              type="url"
              className="req-form-input-reference container"
              maxLength="250"
              value={refLink}
              onChange={HandleLinkChange}
            ></input>

            {loginError && (
              <div className="req-form-login-error container text-center">
                Must be logged in to make a request
              </div>
            )}
            <button
              type="submit"
              className="req-form-submit container"
              onClick={HandleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
