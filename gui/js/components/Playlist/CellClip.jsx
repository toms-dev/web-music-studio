import React from 'react';


module.exports = React.createClass({

    render: function() {
        var cName = "cell";

        if(this.props.alt) cName += " alt";

        return (
            <div className={cName}>
            </div>
        );
    }

});