import React from 'react';


import Channel from './Channel.jsx'


module.exports = React.createClass({

    getState: function() {
        return this.state.toggle;
    },

    toggle: function() {
        this.setState({
            toggle: !this.state.toggle
        }, () => {
            if(this.props.callback)
                this.props.callback.call(this.props.callback, this.state.toggle);
        });
    },

    getInitialState: function() {
        return {
            toggle: false
        };
    },

    render: function() {
        var cName = "toggle";
        if(this.props.alt) cName += " alt";
        if(this.state.toggle) cName +=" on";

        return (
            <div className={cName} onClick={this.toggle}>
            </div>
        );
    }

});