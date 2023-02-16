import React, { Component } from "react";
import "./App.css";
import "./../../global-styles.css";
import SiteHeader from "../SiteHeader/SiteHeader";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import LoginContent from "../LoginContent/LoginContent";
import Spotify from "../../util/Spotify";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchResults: [],
			playlistName: "",
			playlistTracks: [],
			authorized: false,
		};
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.search = this.search.bind(this);
		this.resetPlaylist = this.resetPlaylist.bind(this);
	}

	componentDidMount() {
		if (window.location.href.match(/access_token=([^&]*)/)) {
			this.setState({ authorized: true });
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

	updatePlaylistName(name) {
		this.setState({ playlistName: name });
	}

	savePlaylist() {
		const trackUris = this.state.playlistTracks.map((track) => track.uri);
		Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
			this.setState({
				playlistName: "New Playlist",
			});
		});
	}

	search(term) {
		Spotify.search(term).then((tracks) => this.setState({ searchResults: tracks }));
	}

	resetPlaylist() {
		this.setState({ playlistTracks: [] });
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
									playlistName={this.state.playlistName}
									playlistTracks={this.state.playlistTracks}
									onRemove={this.removeTrack}
									onNameChange={this.updatePlaylistName}
									onSave={this.savePlaylist}
									click={this.makeClickTrue}
									resetPlaylist={this.resetPlaylist}
								/>
							</div>
						</div>
					) : (
						<LoginContent login={this.login} />
					)}
				</div>
			</div>
		);
	}
}

export default App;
