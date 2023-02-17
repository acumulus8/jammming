import React, { Fragment } from "react";
import SlideIn from "../SlideIn/SlideIn";
import CloseIcon from "../../image_assets/close-icon.png";
import "./snackbar.css";

class Snackbar extends React.Component {
	handleClassName() {
		switch (this.props.severity) {
			case "success":
				return "snackbar snackbar--success";
			case "error":
				return "snackbar snackbar--error";
			case "warning":
				return "snackbar snackbar--warning";
			default:
				return "snackbar";
		}
	}

	render() {
		return (
			<div className={this.handleClassName()}>
				<span className="bold">{this.props.message}</span>
				<img className={"close-icon"} src={CloseIcon} onClick={this.props.hideSnackbar} />
			</div>
		);
	}
}

function useSnackbar(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				showSnackbar: false,
				duration: 0,
				message: "",
				severity: "",
			};
			this.showSnackbar = this.showSnackbar.bind(this);
			this.hideSnackbar = this.hideSnackbar.bind(this);
		}

		hideSnackbar() {
			this.setState({ showSnackbar: false });
		}

		showSnackbar(message, severity = "success", duration = 7000) {
			this.setState({ showSnackbar: true, message, severity, duration }, () => {
				setTimeout(() => {
					this.hideSnackbar();
				}, this.state.duration);
			});
		}

		render() {
			return (
				<Fragment>
					<WrappedComponent {...this.props} showSnackbar={this.showSnackbar} hideSnackbar={this.hideSnackbar} />
					<SlideIn startAnimation={this.state.showSnackbar}>
						<Snackbar
							key={this.state.message}
							message={this.state.message}
							severity={this.state.severity}
							hideSnackbar={this.hideSnackbar}
						/>
					</SlideIn>
				</Fragment>
			);
		}
	};
}

export default useSnackbar;
