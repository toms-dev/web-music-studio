import React from 'react';

import Button from './Header/Button.jsx';

module.exports = React.createClass({

    render: function() {
        return (
            <div id="header">
                <h1 id="title">Web-Music-Studio</h1>
                <div id="bpm">
                    <input type="text"/>
                </div>
                <div id="music-controls">
                    <Button>Play</Button>
                    <Button>Stop</Button>
                </div>
            </div>
        );
    }
});