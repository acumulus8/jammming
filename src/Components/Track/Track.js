import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor (props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        this.props.isRemoval ? '-' : '+';
    }

    render () {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                <a className="Track-action" onClick={this.addTrack()} onClick={this.removeTrack()} >{this.renderAction()}</a>
            </div>
        )
    }
}

export default Track;