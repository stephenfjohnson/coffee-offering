import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <Logo>Coffee Offering</Logo>
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="navbar-item" to="/about/about">
          About
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;

const Logo = styled.h1`
  text-transform: uppercase;
`;
