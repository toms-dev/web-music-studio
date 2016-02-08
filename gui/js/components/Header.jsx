import React from 'react';

module.exports = React.createClass({

    playSong: function() {
        console.log("Playing");
        this.props.song.play();
    },

    render: function() {
        return (
            <div id="header">
                <h1 id="title">Web-Music-Studio</h1>
                <div id="bpm">
                    <input type="text"/>
                </div>
                <div id="music-controls">
                    <button onClick={this.playSong}>Play</button>
                    <button>Stop</button>
                </div>
            </div>
        );
    }
});