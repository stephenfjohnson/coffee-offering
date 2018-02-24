import React, { Component } from 'react';

class ElevationIcon extends React.Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill={this.props.color}
          d="M395.8 204.2l-53-53v-137c0-7.8-6.3-14.2-14.2-14.2h-100a14.3 14.3 0 0 0-9.3 25.1l95 81.5v44.6L185.7 279.8l-61.3-61.3a14.3 14.3 0 0 0-20.2 0l-100 100a14.3 14.3 0 0 0-4.2 10v57.2c0 7.9 6.4 14.3 14.3 14.3h371.4c7.9 0 14.3-6.4 14.3-14.3V214.3c0-3.8-1.5-7.4-4.2-10.1z"
        />
      </svg>
    );
  }
}

export default ElevationIcon;
