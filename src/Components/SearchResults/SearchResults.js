import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render () {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd()} />
            </div>
            //needs to receive this.props.searchResults and passes it to tracklist through props)
        )
    }
}

export default SearchResults;