import React, { Component } from "react";
// import { accessToken } from "../../util/Spotify";
import "./site-header.css";

class SiteHeader extends Component {
	constructor(props) {
		super();
		this.state = {};
	}

	render() {
		return (
			<div className="site-header">
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				{/* <button className="log-in-out-btn">{accessToken ? "Log Out" : "Log In"}</button> */}
			</div>
		);
	}
}

export default SiteHeader;
