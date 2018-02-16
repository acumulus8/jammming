import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {searchResults: [{name: 'Thriller', artist: 'Michael Jackson', album: 'Thriller'}],
                  playlistName: 'Pumped up mix',
                  playlistTracks: [{name: 'Rock With You', artist: 'Michael Jackson', album: 'Off The Wall'}]}
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (track.id !== this.state.playlistTracks.id) {
      this.state.playlistTracks.push(track);
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack()} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
