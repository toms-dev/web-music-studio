
import request = require('superagent');
import Song from "../Song";


export function createProject(song: Song, callback: (err: any, projectID: number) => void): void {
	request
		.post("/projects/")
		.end((err: any, res: any) => {
			console.log("got response!", err, res);
		})
}