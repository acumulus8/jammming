import React, { Component } from "react";
import "./login-content.css";

class LoginContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="login-content">
				<h2>How to use Jammming</h2>
				<ul className="login-content__text">
					<li>Log in to your Spotify account</li>
					<li>Search songs and create a playlist</li>
					<li>Name it and save it!</li>
				</ul>
				<button onClick={this.props.login} className="primary-button">
					Log in to Spotify
				</button>
			</div>
		);
	}
}

export default LoginContent;
