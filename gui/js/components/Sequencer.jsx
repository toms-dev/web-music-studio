/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';

import Header from './Sequencer/Header.jsx'
import ChannelList from './Sequencer/ChannelList.jsx'

module.exports = React.createClass({

    render: function() {
        return (
            <div id="sequencer">
                <Header/>
                <ChannelList/>
            </div>
        );
    }
});