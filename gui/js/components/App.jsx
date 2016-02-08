/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';

import Header from './Header.jsx'
import Sequencer from './Sequencer.jsx'
import Playlist from './Playlist.jsx'


import * as Song from 'web-music-studio-audio-core';

import Context from '../states/Context.jsx'

module.exports = React.createClass({
    getInitialState: function() {
        return {
            song: new Song.Song()
        };
    },
    componentDidMount: function() {
        Context.register(() => {
            this.setState(this.state);
        });

        var song = this.state.song;

        var s1 = new Song.Sample("sounds/snare.wav");
        var s2 = new Song.Sample("sounds/kick3.wav");

        s1.name = "Snare";
        s2.name = "Kick";

        song.channels.push(s1);
        song.channels.push(s2);

        //this.state.song.clips.push(new Song.Clip("Derp"));
        this.state.song.currentClip = this.state.song.clips[0];


        this.setState({
            song: this.state.song
        });
    },

    render: function() {
        return (
            <div>
                <Header song={this.state.song}/>
                <div id="app-body">
                    <Sequencer song={this.state.song}/>
                    <Playlist  song={this.state.song}/>
                </div>
            </div>
        );
    }
});
