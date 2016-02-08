import request from "superagent";

export function createProject(song, callback): void {
	request
		.post("/api/projects/")
		.end((err: any, res: any) => {
			console.log("got response!", err, res);
		})
}