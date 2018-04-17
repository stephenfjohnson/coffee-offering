import React, { Fragment } from 'react';
import Link from 'gatsby-link';
import Script from 'react-load-script';
import graphql from 'graphql';

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    console.log(e.target.value);

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...this.state }) })
      .then(() => alert('Success!'))
      .catch(error => alert(error));
    console.log(this.state);
    e.preventDefault();
  };

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <section className="section">
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
                        <input className="input" type="text" name="first-name" placeholder="Enter Your First Name" onChange={this.handleChange} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope" />
                        </span>
                      </div>
                    </div>
                    <div className="column">
                      <label className="label">Last Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" name="last-name" placeholder="Enter Your Last Name" onChange={this.handleChange} />
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
                          <select name="contact-reason" onChange={this.handleChange}>
                            <option value="Default">I'm Interested In</option>
                            <option value="ordering-coffee">Ordering some great coffee</option>
                            <option value="list-coffee">Listing my coffee on this website</option>
                            <option value="media">Media connection</option>
                            <option value="other">Other inquiry</option>
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

export default ContactPage;
