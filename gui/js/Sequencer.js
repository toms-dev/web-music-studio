/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
import Channel from './Channel';

class Sequencer extends React.Component {
    render() {
        let nb_chan = this.props.nb_chan;
        let i = 0;
        var buf;
       /* for (i=0; i<nb_chan-1; i++){
            let current_id = "channel"+i;
            buf += <div id="channel">sequencer</div>
            console.log('lel');
            React.CreateElement(null, {nb_track: 4}, Channel)
        }*/
        return <h1>sequencer</h1>
    }
}

Sequencer.defaultProps ={
    nb_chan : 2
}

ReactDOM.render(
    <Sequencer nb_chan={3} />,
    document.getElementById('sequencer')
)

export default Sequencer