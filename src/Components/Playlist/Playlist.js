import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import TrashCan from "../../image_assets/trash-can-icon.png";

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultValue: "New Playlist",
			playlistName: "",
		};
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
		this.clearFields = this.clearFields.bind(this);
	}

	updatePlaylistName(e) {
		this.setState({ playlistName: e.target.value });
	}

	savePlaylist(e) {
		e.preventDefault();
		if (!this.props.playlistTracks.length) return;
		this.props.onSave(this.state.playlistName);
	}

	clearFields() {
		if (!this.props.playlistTracks.length) return;
		this.props.resetPlaylist();
		this.setState({ showSuccessMessage: false, playlistName: "" });
	}

	handlePlaylistActionsClassname() {
		if (this.props.playlistTracks.length) {
			return "playlist-action-container";
		}
		return "playlist-action-container disabled";
	}

	render() {
		return (
			<div className="playlist">
				<input
					id="playlist-name"
					placeholder={"New Playlist"}
					value={this.state.playlistName}
					onChange={this.updatePlaylistName}
					disabled={!this.props.playlistTracks.length}
				/>
				<label htmlFor="playlist-name" className="playlist-label">
					PLAYLIST NAME
				</label>
				<div className={this.handlePlaylistActionsClassname()}>
					<a className="playlist-save" onClick={this.savePlaylist}>
						SAVE TO SPOTIFY
					</a>
					<div className="playlist-clear" onClick={this.clearFields}>
						CLEAR PLAYLIST
						<img src={TrashCan} className="trash-can-icon" alt="clear" />
					</div>
				</div>
				<TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
			</div>
		);
	}
}

export default Playlist;
