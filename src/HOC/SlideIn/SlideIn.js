import React from "react";
import "./slide-in.css";

class SlideIn extends React.Component {
	constructor(props) {
		super(props);
		this.transitionProperties = this.transitionProperties.bind(this);
	}

	transitionProperties() {
		if (this.props.startAnimation) {
			return { marginLeft: 20 + "%", opacity: 1 };
		} else {
			return {};
		}
	}

	render() {
		return (
			<div className="slide-in" style={this.transitionProperties()}>
				{this.props.children}
			</div>
		);
	}
}

export default SlideIn;
