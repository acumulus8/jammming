import React, { Component } from "react";
import "./app.css";
import "./../../global-styles.css";
import SiteHeader from "../SiteHeader/SiteHeader";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import LoginContent from "../LoginContent/LoginContent";
import Footer from "../Footer/Footer";
import Spotify from "../../util/Spotify";
import useSnackbar from "../../HOC/Snackbar/Snackbar";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistTracks: [],
			authorized: false,
		};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
		this.resetPlaylist = this.resetPlaylist.bind(this);
	}

	componentDidMount() {
		if (window.location.href.match(/access_token=([^&]*)/)) {
			this.setState({ authorized: true }, () => {
				console.log("Authorized: " + this.state.authorized);
				this.props.showSnackbar("Logged in successfully!", "success", 7000);
			});
		} else {
			this.setState({ authorized: false });
		}
	}

	addTrack(track) {
		let trackId = this.state.playlistTracks.find((savedTrack) => track.id === savedTrack.id);
		if (!trackId) {
			this.state.playlistTracks.push(track);
			this.setState({ playlistTracks: this.state.playlistTracks });
		}
	}

	removeTrack(track) {
		let newTracks = this.state.playlistTracks.filter((song) => {
			return song.id !== track.id;
		});
		this.setState({ playlistTracks: newTracks });
	}

	savePlaylist(playlistName) {
		const trackUris = this.state.playlistTracks.map((track) => track.uri);
		return Spotify.savePlaylist(playlistName, trackUris).then(() => {
			this.setState({
				playlistName: "New Playlist",
			});
			this.props.showSnackbar("Playlist saved successfully!", "success", 9000);
		});
	}

	search(term) {
		return Spotify.search(term).then((tracks) =>
			this.setState({ searchResults: tracks }, () => {
				if (tracks.length <= 0) {
					this.props.showSnackbar("No results found!", "error", 7000);
				}
			})
		);
	}

	resetPlaylist() {
		this.setState({ playlistTracks: [] }, () => {
			this.props.showSnackbar("Playlist cleared successfully!", "success", 7000);
		});
	}

	login() {
		Spotify.getAccessToken();
	}

	render() {
		return (
			<div>
				<SiteHeader />
				<div className="App">
					{this.state.authorized ? (
						<div>
							<SearchBar onSearch={this.search} />
							<div className="App-playlist">
								<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onRemove={this.removeTrack} />
								<Playlist
									playlistTracks={this.state.playlistTracks}
									onRemove={this.removeTrack}
									onNameChange={this.updatePlaylistName}
									onSave={this.savePlaylist}
									click={this.makeClickTrue}
									resetPlaylist={this.resetPlaylist}
								/>
							</div>
							<Footer />
						</div>
					) : (
						<LoginContent login={this.login} />
					)}
				</div>
			</div>
		);
	}
}

export default useSnackbar(App);
