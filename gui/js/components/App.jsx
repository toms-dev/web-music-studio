/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';

import Header from './Header.jsx'
import Sequencer from './Sequencer.jsx'
import Playlist from './Playlist.jsx'


import * as Song from 'web-music-studio-audio-core';

import Context from '../states/Context.jsx'

window.react = null;

module.exports = React.createClass({
	socket: null,

	loadProject: function(id) {
		var self = this;
		this.socket = io('http://localhost:3000');
		console.log('connected');

		var save = function() {
			self.socket.emit('update', { projectid: id, data: self.state.song.toJSON() });
		};
		this.currentProjectID = id;

		var socket = this.socket;
		socket.on('connect', function() {

			socket.send(id);

			socket.on('message', function (data) {
				console.log("State update!!!!!!!", data);
				var song;
				if (data.data) {
					song = Song.Song.fromJSON(data.data);
				}
				else {
					song = new Song.Song();
					var author = new Song.User();
					author.email = "TEST";
					song.author = author;

					var s1 = new Song.Sample("sounds/snare.wav");
					var s2 = new Song.Sample("sounds/kick3.wav");
					var s3 = new Song.Sample("sounds/hihat.wav");
					var s4 = new Song.Sample("sounds/closed.wav");

					s1.name = "Snare";
					s2.name = "Kick";
					s3.name = "Hi-hat";
					s4.name = "Closed hi-hat";

					song.channels.push(s1);
					song.channels.push(s2);
					song.channels.push(s3);
					song.channels.push(s4);
				}
				song.currentClip = song.clips[0];

				console.log("Song update!!!!!!!", song);
				self.setState({
					song: song
				});

				save();
			});

			socket.on('message-broadcast', function (data) {
				var curr = self.state.song.currentClip;
				console.log("State broadcast", data);
				var song;

				song = Song.Song.fromJSON(data.data);

				console.log("Song update!!!!!!!", song);

				song.currentClip = curr;
				self.setState({
					song: song
				});
			});


		});
	},

    getInitialState: function() {
		window.react = this;
        return {
            song: new Song.Song()
        };
    },
    componentDidMount: function() {
		var self = this;
        Context.register(() => {
			console.debug("Update componentDidMount:"+this.currentProjectID);
			this.socket.emit('update', { projectid: this.currentProjectID, data: this.state.song.toJSON() });
            this.setState(this.state);
        });
    },

    render: function() {
		//if (window.react.state.song.currentClip == undefined) {
		//	var clip = window.react.state.song.currentClip;
		//	this.state.song.currentClip = clip;
		//}
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
