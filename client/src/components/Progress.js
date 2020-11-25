import React from "react";
import PropTypes from "prop-types";

function Progress({ percentage }) {
  return (
    <div className="progress mt-2">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
}

Progress.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
