import React from 'react';
import Link from 'gatsby-link';
import Script from 'react-load-script';
import graphql from 'graphql';

export default class Coffee extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">Coffee Offering</h1>
          </div>
          <h2 className="has-text-weight-bold is-size-4">Coffee</h2>
          {posts.filter(post => post.node.frontmatter.templateKey === 'coffee-page').map(({ node: post }) => (
            <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
              <p>
                <Link className="has-text-primary" to={post.frontmatter.path}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button is-small" to={post.frontmatter.path}>
                  Keep Reading →
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query Coffee {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
