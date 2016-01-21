/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
//import Sequencer from './Sequencer'

class Channel extends React.Component {
    render() {
        return <div>channel</div>
    }
}

Channel.defaultProps ={
    nb_track : 4
}

ReactDOM.render(
    <Channel nb_chan="{5}" />,
    document.getElementById('sequencer')
)

export default Channel