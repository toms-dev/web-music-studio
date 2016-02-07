/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
var NB_TRACK = require('NB_TRACK');
var tracks = [];

class Channel extends React.Component {
    render() {
        //return <div key={this.props.key}>channel</div>
        return <div>channel{this.props.key} {this.props.id}</div>
    }
}

Channel.propTypes = {
    id: React.PropTypes.number.isRequired
}

Channel.defaultProps = {
    key: 0,
    id: 0,
    nb_track: NB_TRACK
}

ReactDOM.render(
    <Channel/>, document.getElementById('sequencer')
)

export default Channel