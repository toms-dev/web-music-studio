/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
import Channel from './Channel';

var NB_CHAN = require('NB_CHAN');
var channels = [];

class Sequencer extends React.Component {
    render() {
            console.log("CC SI JE RENTRE 2 FOIS ICI ALORS JE PEUX PAS INIT LES CHANNELS :D")
            let nb_chan = this.props.nb_chan;
            for (var i = 0; i < nb_chan - 1; i++) {
                console.log(i);
                channels.push(React.createElement(Channel, {key: i}))
            }
            console.log(channels)
            return <div id={this.props.id}>{channels}</div>;

    }

    addChannel(index) {
    }
}

Sequencer.propTypes = {
    nb_chan: React.PropTypes.number.isRequired
}

Sequencer.defaultProps = {
    id: "sequencer",
    nb_chan: NB_CHAN
}

ReactDOM.render(
    <Sequencer/>, document.getElementById('sequencer')
)

export default Sequencer