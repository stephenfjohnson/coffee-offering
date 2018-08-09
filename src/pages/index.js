import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import Script from 'react-load-script';
import graphql from 'graphql';
import styled from 'styled-components';

import Contact from '../components/Contact';
import HeroPhoto from '../img/coffee.jpg';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleScriptLoad() {
    if (typeof window !== `undefined` && window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    console.log(data.allMarkdownRemark);
    console.log(this.props);

    return (
      <Fragment>
        <section className="hero is-medium is-dark">
          <Hero photo={HeroPhoto} className="hero-body">
            <div className="container">
              <h1 className="title">Global Coffee Inventory</h1>
            </div>
          </Hero>
        </section>
        <section className="section">
          <Script url="https://identity.netlify.com/v1/netlify-identity-widget.js" onLoad={() => this.handleScriptLoad()} />
          <div className="container">
            {posts.filter(post => post.node.frontmatter.templateKey === 'coffee-page').map(({ node: post }) => (
              <div className="content" style={{ border: '1px solid #eaecee', padding: '1.5em 2em' }} key={post.id}>
                <div className="columns" key={post.id}>
                  <div className="column">Origin: {post.frontmatter.origin}</div>
                  <div className="column">Name: {post.frontmatter.title}</div>
                  <div className="column">Bags: {post.frontmatter.bags}</div>
                  <div className="column is-clearfix">
                    <Link className="button is-small is-primary is-pulled-right" to={post.fields.slug}>
                      Order Info →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Contact />
      </Fragment>
    );
  }
}

export const pageQuery = graphql`
  query IndexPage {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
            bags
            origin
          }
        }
      }
    }
  }
`;

const Hero = styled.div`
  background: url(${HeroPhoto}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
