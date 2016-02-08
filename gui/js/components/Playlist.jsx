import React from 'react';

import Header from './Playlist/Header.jsx'
import LaneList from './Playlist/LaneList.jsx'

module.exports = React.createClass({

    render: function() {
        return (
            <div id="playlist">
                <Header/>
                <LaneList song={this.props.song}/>
            </div>
        );
    }
});