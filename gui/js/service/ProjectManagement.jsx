import {Song, User} from "web-music-studio-audio-core"

export function createProject(username: string, userID: string, name: string, callback): void {
	var songData = {};
	songData.name = name;
	songData.username = username;
	songData.contributors = [userID];
	songData.createdAt = new Date().toGMTString();

	var song = new Song();
	song.author = new User();
	song.author.username = username;

	songData.data = song.toJSON();

	console.log("Creating project: ",songData);

	$.post(
		"http://localhost:3000/api/projects/",
		songData,
		(err: any, res: any) => {
			console.log("got response!", err, res);
			callback();
		}
	);
}

export function listProjects(callback): void {
	$.get(
		"http://localhost:3000/api/projects/",
		(data: any, res: any) => {
			console.log("Got projects!", data, res);
			callback(data);
		}
	);
}

module.exports.createProject = createProject;
module.exports.listProject = listProjects;