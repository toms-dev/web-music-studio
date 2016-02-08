/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';

import Header from './Header.jsx'
import Sequencer from './Sequencer.jsx'
import Playlist from './Playlist.jsx'


module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                <div id="app-body">
                    <Sequencer/>
                    <Playlist/>
                </div>
            </div>
        );
    }
});
