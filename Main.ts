

import Song from "./model/Song";
import ClipInstance from "./model/ClipInstance";

var song = new Song();
var clip1 = new ClipInstance();
clip1.startTime = 6400;
song.playlist.clips.push(clip1);

var clip2 = new ClipInstance();
clip2.startTime = 6600;
song.playlist.clips.push(clip2);

song.play();
setTimeout(() => {
	console.log("Pausing");
	song.pause();
	setTimeout(() => {
		console.log("Resuming");
		song.play();
	}, 2500)
}, 2500);