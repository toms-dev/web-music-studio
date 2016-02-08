/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';


module.exports = React.createClass({
    open: function() {
        this.setState({
            visible: true
        });
    },

    close: function() {
        this.setState({
            visible: false
        });
    },

    toggle: function() {
        this.setState({
            visible: !this.state.visible
        });
    },

    getInitialState: function() {
        return {
            visible: false
        };
    },

    render: function() {
        var cName = "modal";

        if(this.state.visible) cName += " visible";

        return (
            <div id={this.props.id} className={cName}>
                {this.props.children}
            </div>
        );
    }
});