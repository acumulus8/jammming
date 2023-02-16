import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { term: "" };
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	search(e) {
		e.preventDefault();
		if (!this.state.term) return;
		this.props.onSearch(this.state.term);
	}

	handleTermChange(e) {
		let term = e.target.value;
		this.setState({ term: term });
	}

	render() {
		return (
			<div className="SearchBar">
				<input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
				<div className="primary-button" onClick={this.search}>
					SEARCH
				</div>
			</div>
		);
	}
}

export default SearchBar;
