/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Sequencer from './js/Sequencer'


/* Ex with argument passing
 var sequencer = React.createElement(Sequencer, {nb_chan: 3}); */

//var sequencer = React.createElement(Sequencer);

class App extends React.Component {
    render() {
        return <div>
            <Sequencer/></div>
    }
}

export  default  App;