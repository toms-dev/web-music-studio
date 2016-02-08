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

        this.props.channel.sequence = s;

        Context.notifyAll();
    },

    render: function() {
        console.log("Sequence: ", this.props.channel.sequence);

        var self = this;
        var sequence = this.props.channel.sequence.map((t, i) => {
            var on = t?true:false;
            return ((i/4)%2 < 1)?
                (<Toggle ref={"toggle-"+i} callback={self.updateSequence} on={on}/>):
                (<Toggle ref={"toggle-"+i} callback={self.updateSequence} on={on}/>);
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