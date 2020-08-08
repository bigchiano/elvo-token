import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark secondary-color">
          <a className="navbar-brand" href="/">
            {this.props.tokenName}
          </a>
        </nav>
        <div id="msg" className="hideMsg" role="alert"></div>
        <br />
      </div>
    );
  }
}

export default NavBar;
