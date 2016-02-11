import React from 'react';

import Context from '../states/Context.jsx'

module.exports = React.createClass({

    playSong: function() {
        console.log("Playing");
        this.props.song.play();
    },

    handleBPMChange: function() {
        this.props.song.config.bpm = this.refs["bpm"].value;

        Context.notifyAll();
    },

    render: function() {
        return (
            <div id="header">
                <h1 id="title">Web-Music-Studio</h1>
                <div id="bpm">
                    BPM:
                    <input type="text" value={this.props.song.config.bpm} onChange={this.handleBPMChange} ref="bpm"/>
                </div>
                <div id="music-controls">
                    <button onClick={this.playSong}>Play</button>
                    <button>Stop</button>
                </div>
            </div>
        );
    }
});