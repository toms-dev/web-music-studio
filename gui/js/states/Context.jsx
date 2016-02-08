
import * as Song from 'web-music-studio-audio-core';

var callbacks = [];

module.exports = {
    register: function(callback) {
        callbacks.push(callback);
    },

    notifyAll: function() {
        callbacks.forEach((c) => {
            c.apply(c);
        })
    }
};