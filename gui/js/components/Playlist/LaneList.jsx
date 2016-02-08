import React from 'react';

import Lane from './Lane.jsx'
import CounterHeader from './CounterHeader.jsx'

module.exports = React.createClass({

    getInitialState: function() {
        return {
            lanes: [1, 1, 1, 1]
        };
    },

    render: function() {
        var lanes = this.state.lanes.map((l, i) => {
            return (
              <Lane song={this.props.song} index={i}/>
            );
        });

        return (
            <div className="lanes">
                <CounterHeader/>
                {lanes}
            </div>
        );
    }

});