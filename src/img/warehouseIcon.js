import React, { Component } from 'react';

class WarehouseIcon extends React.Component {
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path path={this.props.color} d="M256 0L0 128v332.8h102.4v-256h307.2v256H512V128z" />
        <path
          path={this.props.color}
          d="M128 409.6h51.2v51.2H128zm0-76.8h51.2V384H128zm0-76.8h51.2v51.2H128zm76.8 0H256v51.2h-51.2zm0 153.6H256v51.2h-51.2zm0-76.8H256V384h-51.2zm76.8 76.8h51.2v51.2h-51.2zm0-76.8h51.2V384h-51.2z"
        />
      </svg>
    );
  }
}

export default WarehouseIcon;
