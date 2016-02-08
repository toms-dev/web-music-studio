import React from 'react';

import Modal from '../Modal.jsx'

import * as Song from 'web-music-studio-audio-core';

import Context from '../../states/Context.jsx'

module.exports = React.createClass({

    openCreateModal: function() {
        var modal = this.refs['create-modal'];
        this.refs["create-clip-name"].value = "";
        console.log(this.refs);
        modal.open();
    },

    closeCreateModal: function() {
        var modal = this.refs['create-modal'];
        this.refs["create-clip-name"].value = "";
        modal.close();
    },

    createClip: function() {
        var name = this.refs["create-clip-name"].value;

        if(name === "") return;

        var clip = new Song.Clip(name);

        clip.sequences = this.props.song.channels.map((c) => {
            var sequence = new Song.SequencerSequence([0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], 4);
            sequence.channel = c;
            return sequence;
        });

        this.props.song.clips.push(clip);

        this.closeCreateModal();

        var activeClip = this.refs["active-clip"];
        activeClip.value = this.props.song.clips.length - 1;
        this.props.song.currentClip = this.props.song.clips[this.props.song.clips.length - 1];

        Context.notifyAll();
    },

    setActiveClip: function() {
        var activeClip = this.refs["active-clip"];

        this.props.song.currentClip = this.props.song.clips[activeClip.value];

        Context.notifyAll();
    },

    render: function() {
        var self = this;
        var clips = this.props.song.clips.map((c, i) => {
            var selected = false;
            if(self.props.song.currentClip && c.id == self.props.song.currentClip.id) selected = true;
            return (
                <option value={i} selected={selected}>{c.name}</option>
            );
        });

        return (
            <div className="header">
                <select className="clip-selector" onChange={this.setActiveClip} ref="active-clip">
                    {clips}
                </select>
                <button className="add-selector" onClick={this.openCreateModal}>+</button>
                <Modal id="create-clip" ref="create-modal">
                    <h1>Create a new Clip</h1>
                    <input type="text" ref="create-clip-name"/>
                    <div className="buttons">
                        <button ref="ok" onClick={this.createClip}>Ok</button>
                        <button ref="cancel" onClick={this.closeCreateModal}>Cancel</button>
                    </div>
                </Modal>
            </div>
        );
    }

});