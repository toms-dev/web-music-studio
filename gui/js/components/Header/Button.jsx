import React from 'react';

module.exports = React.createClass({

    render: function() {
        return (
            <button>{this.props.children}</button>
        );
    }
});