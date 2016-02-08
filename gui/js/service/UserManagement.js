
export function signIn(email, password, callback) {
	$.post("http://localhost:3000/api/users/auth", {
		username: email,
		password: password
	}, function(response, str) {
		console.log("Sign-in response! ", response, str);
		callback(response.userExists);
	});
}

export function signUp(email, password, callback) {
	$.post("http://localhost:3000/api/users", {
		username: email,
		password: password
	}, function(response, str) {
		console.log("Sign-up response! ", response, str);
		var success = response.message == undefined;
		callback(success, response);
	});
}
