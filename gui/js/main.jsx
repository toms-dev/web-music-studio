/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {SongAPI} from 'web-music-studio-audio-core';

import App from './components/App';

ReactDOM.render((
    <App/>
), document.getElementById('app'));

SongAPI.createProject(null, null);