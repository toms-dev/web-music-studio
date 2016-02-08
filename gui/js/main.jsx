/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import {SongAPI} from 'web-music-studio-audio-core';

import App from './components/App';
import * as UserManagement from './service/UserManagement';

ReactDOM.render((
    <App/>
), document.getElementById('app'));

$("#signUp").click(() => {
	UserManagement.signUp(
		$("#email").val(), $("#password").val()
	);
});
$("#signIn").click(() => {
	UserManagement.signIn(
		$("#email").val(), $("#password").val()
	)
});

//SongAPI.createProject(null, null);