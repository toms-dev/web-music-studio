import request from "superagent";

export function createProject(song, callback): void {
	request
		.post("http://localhost:3000/api/projects/")
		.end((err: any, res: any) => {
			console.log("got response!", err, res);
		})
}