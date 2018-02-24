import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';
import styled from 'styled-components';

import OriginIcon from '../img/originIcon.js';
import StatusIcon from '../img/statusIcon.js';
import WarehouseIcon from '../img/warehouseIcon.js';
import CoffeeBagsIcon from '../img/bagsIcon.js';
import HarvestIcon from '../img/harvestIcon.js';
import ElevationIcon from '../img/elevationIcon.js';
import ProcessIcon from '../img/processIcon.js';
import SpeciesIcon from '../img/speciesIcon.js';

export const CoffeePostTemplate = ({ content, contentComponent, title, offeringBy, origin, status, house, bags, harvest, elevation, process, description, helmet }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light has-text-centered">Offering Data: {title}</h1>
            <h2 className="subtitle is-size-3 has-text-centered">Offering by: {offeringBy}</h2>
            <div className="columns">
              <div className="column has-text-centered">
                <Icon>
                  <OriginIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Origin</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{origin}</Span>
                </p>
              </div>
              <div className="column has-text-centered">
                <Icon>
                  <StatusIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Status</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{status}</Span>
                </p>
              </div>
              <div className="column has-text-centered">
                <Icon>
                  <WarehouseIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Warehouse</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{house}</Span>
                </p>
              </div>
              <div className="column has-text-centered">
                <Icon>
                  <CoffeeBagsIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Bags</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{bags}</Span>
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="column has-text-centered">
                <Icon>
                  <HarvestIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Harvest</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{harvest}</Span>
                </p>
              </div>
              <div className="column has-text-centered">
                <Icon>
                  <ElevationIcon color="white" ariaLabel="Elevation Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Elevation</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{elevation}m</Span>
                </p>
              </div>
              <div className="column has-text-centered">
                <Icon>
                  <ProcessIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Process</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{process}</Span>
                </p>
              </div>
              <div className="column has-text-centered">
                <Icon>
                  <SpeciesIcon color="white" ariaLabel="Coffee Bag Item" />
                </Icon>
                <p className="is-size-2">
                  <Span className="is-size-6 block">Species</Span>
                  <Span className="is-size-4 block has-text-weight-bold">{origin}</Span>
                </p>
              </div>
            </div>

            <h2 className="title is-size-3">Cup Profile</h2>
            <p>{description}</p>
            <h2 className="title is-size-3">Story</h2>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <CoffeePostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Helmet title={`Coffee | ${post.frontmatter.title}`} />}
      title={post.frontmatter.title}
      offeringBy={post.frontmatter.offeringBy}
      origin={post.frontmatter.origin}
      status={post.frontmatter.status}
      house={post.frontmatter.house}
      bags={post.frontmatter.bags}
      harvest={post.frontmatter.harvest}
      elevation={post.frontmatter.elevation}
      process={post.frontmatter.process}
      description={post.frontmatter.description}
    />
  );
};

export const pageQuery = graphql`
  query CoffeePostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        offeringBy
        origin
        status
        house
        bags
        harvest(formatString: "MMMM YYYY")
        elevation
        process
        description
      }
    }
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto 0.6rem auto;
  fill: white;
`;

const Span = styled.span`
  display: block;
  line-height: 1;
`;
