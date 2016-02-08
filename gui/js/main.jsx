/**
 * Created by Louis on 18/01/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';



import App from './components/App';
import * as UserManagement from './service/UserManagement';

ReactDOM.render((
    <App/>
), document.getElementById('app'));

$("#signUp").click(() => {
	UserManagement.signUp(
		$("#email").val(), $("#password").val(),
		function(success, data) {
			if (success) {
				alert("Success!")
			}
			else {
				alert("Failure: " + data.message);
			}
		}
	);
});
$("#signIn").click(() => {
	UserManagement.signIn(
		$("#email").val(), $("#password").val(),
		function(success) {
			if (! success) {
				alert("Login failed!");
				return;
			}
			$("#login").fadeOut(100);
		}
	)
});
