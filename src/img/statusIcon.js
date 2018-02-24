import React, { Component } from 'react';

class StatusIcon extends React.Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill={this.props.color}
          d="M256 0A211.5 211.5 0 0 0 44.5 211.5C44.5 372.2 256 512 256 512s211.5-139.8 211.5-300.5A211.5 211.5 0 0 0 256 0zm0 376a164.4 164.4 0 1 1 0-329 164.4 164.4 0 0 1 0 328.8z"
        />
        <path fill={this.props.color} d="M314.2 132.6c0-5.4-4.4-9.8-9.8-9.8h-98a9.8 9.8 0 0 0-9.9 9.8v66.5l56.2-16.5 2.8-.8 2.8.8 55.9 16.4v-66.4z" />
        <path fill={this.props.color} d="M216.1 318.9h34.4V193.5l-93.2 27.3zm44.2 0h34.4l58.9-98.1-93.3-27.3z" />
      </svg>
    );
  }
}

export default StatusIcon;
