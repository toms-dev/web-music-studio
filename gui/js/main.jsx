/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';



import App from './components/App';
import * as UserManagement from './service/UserManagement';
import * as ProjectManagement from './service/ProjectManagement';
import {Song} from "web-music-studio-audio-core";

ReactDOM.render((
    <App/>
), document.getElementById('app'));

$("#signUp").click(() => {
	UserManagement.signUp(
		$("#email").val(), $("#password").val(),
		function(success, data) {
			if (success) {
				alert("Success! You can now login using the credentials you provided.")
			}
			else {
				alert("Failure: " + data.message);
			}
		}
	);
});
$("#signIn").click(() => {
	var email = $("#email").val(),
		password = $("#password").val();
	UserManagement.signIn(
		email, password,
		function(success, userData) {
			if (! success) {
				alert("Wrong credentials.");
				return;
			}
			window.userID = userData._id;
			window.username = email;
			$("#login").fadeOut(100);
			onSignIn();
		}
	)
});

function onSignIn() {
	$("#projects-list-window").fadeIn(100);
	refreshProjectList();
}

function refreshProjectList() {
	ProjectManagement.listProjects((projects) => {
		console.log("Got projects: ", projects);

		var $content = $("#projects-list-content").empty();
		if (projects.length == 0) {
			$content.append($("<div>").text("No projects to show. Create a new one!"));
			return;
		}
		projects.forEach((p) => {
			var $el = $("<li>");
			$el.text(p.name);
			$el.click(() => {
				console.log("PROJECT DATA:", p);
				//var song = Song.fromJSON(p.data);
				//console.log("Deserialized song:", song);
				window.react.loadProject(p._id);
				$("#projects-list-window").fadeOut(100);
			});
			$content.append($el);
		});

	})
}

$("#new-project-button").click(() => {
	var projectName = window.prompt();
	var userID = window.userID,
		username = window.username;
	ProjectManagement.createProject(username, userID, projectName, () => {
		refreshProjectList();
	});
});
