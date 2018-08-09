import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import Logo from '../img/logo';

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <Logo color="white" width="40" />
          <LogoText>Coffee Offering</LogoText>
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

const LogoText = styled.h1`
  text-transform: uppercase;
  margin-left: 10px;
`;
