import React from 'react';


import Channel from './Channel.jsx'


module.exports = React.createClass({

    getInitialState: function() {
        return {
            channels: [1, 1, 1, 1]
        };
    },

    render: function() {
        var clip = this.props.song.currentClip;

        var channels = [];
        if(clip) {
            channels = clip.sequences.map((c) => {
                return (
                    <Channel channel={c}/>
                );
            });
        }

        return (
            <div className="channel-list">
                {channels}
            </div>
        );
    }

});