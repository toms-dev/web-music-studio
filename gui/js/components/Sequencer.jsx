/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';

import Header from './Sequencer/Header.jsx'
import ChannelList from './Sequencer/ChannelList.jsx'

import Context from '../states/Context.jsx'

module.exports = React.createClass({

    componentDidMount: function() {

    },

    render: function() {

        console.log(this.props.song);
        return (
            <div id="sequencer">
                <Header song={this.props.song}/>
                <ChannelList song={this.props.song}/>
            </div>
        );
    }
});