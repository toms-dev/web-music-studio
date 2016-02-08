import React from 'react';


import Channel from './Channel.jsx'


module.exports = React.createClass({

    getInitialState: function() {
        return {
            channels: [1, 1, 1, 1]
        };
    },

    render: function() {
        var channels = this.state.channels.map((c) => {
            return (
                <Channel/>
            );
        });
        return (
            <div className="channel-list">
                {channels}
            </div>
        );
    }

});