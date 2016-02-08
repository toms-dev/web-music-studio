import React from 'react';

import CellClipInstance from './CellClipInstance.jsx'

import Context from '../../states/Context.jsx'

module.exports = React.createClass({

    addClipInstance: function() {
        var clip = this.props.song.currentClip;
        var start = this.props.cellId * 4;
        var lane = this.props.laneId;

        this.props.song.playlist.addClip(clip.id, start, lane);

        Context.notifyAll();
    },

    render: function() {
        var start = this.props.cellId * 4;
        var lane = this.props.laneId;

        var clipInstance = this.props.song.playlist.getClipInstance(start, lane);

        var cellClipInstance = "";

        if(clipInstance) {
            cellClipInstance = (
                <CellClipInstance song={this.props.song} clip={clipInstance}/>
            )
        }

        var cName = "cell";

        if(this.props.alt) cName += " alt";

        return (
            <div className={cName} onClick={this.addClipInstance}>
                {cellClipInstance}
            </div>
        );
    }

});