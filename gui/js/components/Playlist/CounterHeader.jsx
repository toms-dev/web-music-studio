import React from 'react';


module.exports = React.createClass({

    getInitialState: function() {
        var cells = [];
        for(let x = 0; x < 50; ++x) {
            cells.push({});
        }
        return {
            cells: cells
        };
    },

    render: function() {
        var cells = this.state.cells.map((c, i) => {
            var cName = "cell";
            if(i%2 === 1) cName += " alt";
            return (
                <div className={cName}>{i*4+1}</div>
            );
        });

        return (
            <div className="counter-header">
                {cells}
            </div>
        );
    }

});