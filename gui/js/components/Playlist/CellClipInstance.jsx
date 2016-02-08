import React from 'react';

import Context from '../../states/Context.jsx'

module.exports = React.createClass({

    removeClipInstance: function(e) {
        e.stopPropagation();

        console.log("Removing");
        this.props.song.playlist.removeClipInstance(this.props.clip);

        console.log("clips:", this.props.song.playlist.clips);

        Context.notifyAll();
    },

    render: function() {
        return (
            <div className="clip-instance" onClick={this.removeClipInstance}>
                {this.props.clip.clip.name}
            </div>
        );
    }

});