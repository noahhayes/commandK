import React, { Component } from "react";
import { ExternalLink } from "react-external-link";
import { G_DOMAIN, G_URL } from "../config";
import "../style.scss";

class Error extends Component {
  render() {
    return (
      <div className="container">
        <div className="error">
          <div>
            Please visit <ExternalLink href={G_URL}>{G_DOMAIN}</ExternalLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
