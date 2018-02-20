import React from 'react';
import Link from 'gatsby-link';
import Script from 'react-load-script';
import graphql from 'graphql';

export default class IndexPage extends React.Component {
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

    return (
      <section className="section">
        <Script url="https://identity.netlify.com/v1/netlify-identity-widget.js" onLoad={() => this.handleScriptLoad()} />
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
          <h2 className="has-text-weight-bold is-size-4">Latest Stories</h2>
          {posts.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node: post }) => (
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
        <div className="container">
          <div className="content">
            <form name="contact" netlify>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input" />
                </div>
              </div>

              <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-user" />
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-check" />
                  </span>
                </div>
                <p class="help is-success">This username is available</p>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input is-danger" type="email" placeholder="Email input" value="hello@" />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope" />
                  </span>
                  <span class="icon is-small is-right">
                    <i class="fas fa-exclamation-triangle" />
                  </span>
                </div>
                <p class="help is-danger">This email is invalid</p>
              </div>

              <div class="field">
                <label class="label">Message</label>
                <div class="control">
                  <textarea class="textarea" placeholder="Textarea" />
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                  <button class="button is-text">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
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
