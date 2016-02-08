import React from 'react';


import Channel from './Channel.jsx'


module.exports = React.createClass({

    on: false,

    getState: function() {
        return this.on;
    },

    toggle: function() {
        this.on = !this.on;

        if(this.props.callback)
            this.props.callback.call(this.props.callback, this.on);
    },

    on: function() {
        this.on = true;

        if(this.props.callback)
            this.props.callback.call(this.props.callback, this.on);
    },

    off: function() {
        this.on = false;

        if(this.props.callback)
            this.props.callback.call(this.props.callback, this.on);
    },

    getInitialState: function() {
        return {
            toggle: false
        };
    },

    render: function() {
        this.on = this.props.on;

        var cName = "toggle";
        if(this.props.alt) cName += " alt";
        if(this.on) cName +=" on";

        return (
            <div className={cName} onClick={this.toggle}>
            </div>
        );
    }

});