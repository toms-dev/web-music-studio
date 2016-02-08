import React from 'react';

import Toggle from './Toggle.jsx'

import Context from '../../states/Context.jsx'

module.exports = React.createClass({

    getInitialState: function() {
        return {
            name: "a",
            sequence: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        };
    },

    updateSequence: function() {
        var s = [];
        for(let x = 0; x < 16; ++x) {
            s.push(this.refs["toggle-"+x].getState()?1:0);
        }

        console.log(s);

        this.props.channel.sequence = s;

        Context.notifyAll();
    },

    render: function() {
        var self = this;
        var sequence = this.state.sequence.map((s, i) => {
            return ((i/4)%2 < 1)?
                (<Toggle ref={"toggle-"+i} callback={self.updateSequence}/>):
                (<Toggle ref={"toggle-"+i} callback={self.updateSequence}/>);
        });


        return (
            <div className="channel">
                <div className="name">{this.props.channel.channel.name}</div>
                <div className="sequence">
                    {sequence}
                </div>
            </div>
        );
    }

});