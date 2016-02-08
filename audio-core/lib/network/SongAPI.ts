
import request = require('superagent');
import Song from "../Song";


export function createProject(song: Song, callback: (err: any, projectID: number) => void): void {
	request
		.post("/api/")
		.end((err, res) => {
			console.log("got response!", err, res);
		})
}