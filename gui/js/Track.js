/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
var NB_TRACK = require('NB_TRACK');

class Track extends React.Component {
    render() {
        return <div id={this.props._id}>track</div>
    }
}

Track.defaultProps = {
    chan_id: 0,
    track_id: 0
}

ReactDOM.render(
    document.getElementById('channel'+this.props.chan_id)
)

export default Track