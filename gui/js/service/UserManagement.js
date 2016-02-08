
export function signIn(username, password) {

}

export function signUp(email, password) {
	$.post("http://localhost:3000/api/users", {
		username: email,
		password: password
	}, function(response, str) {
		console.log("Response! ", response, str);
	})
}
