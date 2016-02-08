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
					song.channels[0].name = "Snare";
					song.channels[1].name = "Kick";
				}
				else {
					song = new Song.Song();
					var author = new Song.User();
					author.email = "TEST";
					song.author = author;

					var s1 = new Song.Sample("sounds/snare.wav");
					var s2 = new Song.Sample("sounds/kick3.wav");

					s1.name = "Snare";
					s2.name = "Kick";

					song.channels.push(s1);
					song.channels.push(s2);
				}
				console.log("Song update!!!!!!!", song);
				self.setState({
					song: song
				});

				save();
			});

			socket.on('message-broadcast', function (data) {
				console.log("State broadcast", data);
				var song;

				song = Song.Song.fromJSON(data.data);
				song.channels[0].name = "Snare";
				song.channels[1].name = "Kick";

				console.log("Song update!!!!!!!", song);
				self.setState({
					song: song
				});
			});


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
