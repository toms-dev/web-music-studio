import React from 'react';


import Channel from './Channel.jsx'


module.exports = React.createClass({

    getInitialState: function() {
        return {
            toggle: false
        };
    },

    render: function() {
        var cName = "toggle";
        if(this.props.alt) cName += " alt";

        return (
            <div className={cName}>
            </div>
        );
    }

});