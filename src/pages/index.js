import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import Script from 'react-load-script';
import graphql from 'graphql';

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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...this.state }) })
      .then(() => alert('Success!'))
      .catch(error => alert(error));
    console.log(this.state);
    e.preventDefault();
  };

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
      <Fragment>
        <section className="hero is-medium is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Coffee Offering</h1>
              <h2 className="subtitle">Some random text</h2>
            </div>
          </div>
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
                    <Link className="button is-small is-primary is-pulled-right" to={post.frontmatter.path}>
                      Order Info →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="container">
            <div className="content">
              <h2 className="has-text-weight-bold is-size-4">Contact</h2>
              <form name="contact" method="post" action="/thanks/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={this.handleSubmit}>
                <p hidden>
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="field">
                  <div className="columns">
                    <div className="column">
                      <label className="label">First Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name="name" placeholder="Enter Your First Name" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope" />
                        </span>
                      </div>
                    </div>
                    <div className="column">
                      <label className="label">Last Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name="name" placeholder="Enter Your Last Name" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="columns">
                    <div className="column">
                      <label className="label">Email</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="email" name="email" placeholder="Enter Your Email" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope" />
                        </span>
                        {/* <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                  </span> */}
                      </div>
                      {/* <p className="help is-danger">This email is invalid</p> */}
                    </div>
                    <div className="column">
                      <label className="label">Phone</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name="phone" placeholder="Enter Your Phone Number" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope" />
                        </span>
                        {/* <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle" />
                  </span> */}
                      </div>
                      {/* <p className="help is-danger">This email is invalid</p> */}
                    </div>
                    <div className="column">
                      <label className="label">Subject</label>
                      <div className="control">
                        <div className="select">
                          <select>
                            <option>I'm Interested In</option>
                            <option>Ordering some great coffee</option>
                            <option>Listing my coffee on this website</option>
                            <option>Media connection</option>
                            <option>Other inquiry</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">Message</label>
                  <div className="control">
                    <textarea className="textarea" name="message" placeholder="How can we help?" onChange={this.handleChange} />
                  </div>
                </div>

                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Fragment>
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
            bags
            origin
          }
        }
      }
    }
  }
`;
