/**
 * Created by shenlin on 27/12/2017.
 */
import React, { Component } from 'react';
import './styles.css';

export default class extends Component {
  render() {
    const svgs = [];

    for (let i = 0; i < 10; i += 1) {
      svgs.push((
        <svg height="80" width="210" key={i}>
          <ellipse cx="25" cy="20" fill="none" rx="10" ry="10" />
        </svg>));
    }

    return (
      <div className="contain">
        {svgs}
      </div>
    );
  }
}
