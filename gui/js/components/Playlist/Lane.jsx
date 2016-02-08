import React from 'react';

import CellClip from './CellClip.jsx'

module.exports = React.createClass({

    getInitialState: function() {
        var cells = [];
        for(let x = 0; x < 50; ++x) {
            cells.push({});
        }
        return {
            cells: cells
        };
    },

    render: function() {
        var self = this;
        var cells = this.state.cells.map((c, i) => {
           return (i%2 === 0)?
               (<CellClip song={this.props.song} laneId={self.props.index} cellId={i}/>):
               (<CellClip song={this.props.song} laneId={self.props.index} cellId={i} alt="true"/>);
        });

        return (
            <div className="lane">
                {cells}
            </div>
        );
    }

});