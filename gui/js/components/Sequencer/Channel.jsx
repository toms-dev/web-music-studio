import React from 'react';

import Toggle from './Toggle.jsx'

module.exports = React.createClass({

    getInitialState: function() {
        return {
            name: "a",
            sequence: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        };
    },

    render: function() {
        var sequence = this.state.sequence.map((s, i) => {
            return ((i/4)%2 < 1)?
                (<Toggle/>):
                (<Toggle alt="true"/>);
        });
        return (
            <div className="channel">
                <div className="name">{this.state.name}</div>
                <div className="sequence">
                    {sequence}
                </div>
            </div>
        );
    }

});