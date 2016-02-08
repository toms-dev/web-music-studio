import React from 'react';


import Channel from './Channel.jsx'


module.exports = React.createClass({

    getInitialState: function() {
        return {
            toggle: false
        };
    },

    render: function() {
        return (
            <div className="toggle">
            </div>
        );
    }

});