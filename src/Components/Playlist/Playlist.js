import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                      displayMessage: '',
                    };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }
 
    handleNameChange(e) {
        const name = e.target.value;
        this.props.onNameChange(name);
        this.setState({displayMessage: 'false'});
    }

    onClick(event) {
        this.props.onSave();
        this.setState({displayMessage: 'true'});
    }

    renderMessage() {
        if (this.state.displayMessage === 'true') {
            return (<div className="save-msg">Sounds good!<br /><span className="bold">Playlist has been saved!</span></div>);
        }
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
                <TrackList 
                    tracks={this.props.playlistTracks} 
                    onRemove={this.props.onRemove} 
                    isRemoval={true} 
                />
                {this.renderMessage()}
                <a className="Playlist-save" onClick={this.onClick} >SAVE TO SPOTIFY</a>
                <a className="Playlist-save clear" onClick={this.props.resetPlaylist}>CLEAR PLAYLIST</a>
            </div>

        )
    }
}

export default Playlist;
