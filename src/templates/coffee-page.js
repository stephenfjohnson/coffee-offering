import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

export const CoffeePostTemplate = ({ content, contentComponent, title, offeringBy, origin, status, house, bags, harvest, elevation, process, description, helmet }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">Offering Data: {title}</h1>
            <h2 className="title is-size-3">Offering by: {offeringBy}</h2>
            <p>Origin: {origin}</p>
            <p>Status: {status}</p>
            <p>House: {house}</p>
            <p>Bags: {bags}</p>
            <p>Harvest: {harvest}</p>
            <p>Elevation: {elevation}m</p>
            <p>Process: {process}</p>
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
        harvest
        elevation
        process
        description
      }
    }
  }
`;
