/**
 * Created by Louis on 21/01/2016.
 */
import React from 'react';
import  ReactDOM from 'react-dom';

var urls = ["../images/button_on.png", "../images/button_off.png"];
var img_src;

class ClipButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: props.initialCount
        };
        img_src = props.initialImgSrc;
    }

    handleClick() {
        this.setState({count: (this.state.count + 1) % 2});
        img_src = urls[this.state.count];
        //TODO : bind to model
    }

    render() {
        return (
            <img src={img_src} onClick={this.handleClick.bind(this)}></img>
        );
    }
}

ClipButton.propTypes = {initialCount: React.PropTypes.number, initialImgSrc: React.PropTypes.string};
ClipButton.defaultProps = {initialCount: 0, initialImgSrc: urls[1]};


export default ClipButton