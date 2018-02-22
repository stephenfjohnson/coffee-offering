import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Content, { HTMLContent } from '../components/Content';

export const CoffeePostTemplate = ({ content, contentComponent, description, title, bags, origin, helmet }) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">Offering: {title}</h1>
            <p>{description}</p>
            <p>Bags: {bags}</p>
            <p>Origin: {origin}</p>
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
      bags={post.frontmatter.bags}
      origin={post.frontmatter.origin}
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
        description
        bags
        origin
      }
    }
  }
`;
