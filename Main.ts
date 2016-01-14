

import Song from "./model/Song";
import ClipInstance from "./model/ClipInstance";
import Clip from "./model/Clip";
import SequencerSequence from "./model/sequences/SequencerSequence";
import Sample from "./model/channels/Sample";

var myclip = new Clip();
var myseq = new SequencerSequence();
var sample = new Sample();
sample.filePath = "kick.wav";
myseq.channel = sample;
myclip.sequences.push(myseq);

var song = new Song();
var clipInstance1 = new ClipInstance();
clipInstance1.clip = myclip;
clipInstance1.startTime = 6400;
song.playlist.clips.push(clipInstance1);

var clipInstance2 = new ClipInstance();
clipInstance2.clip = myclip;
clipInstance2.startTime = 6600;
song.playlist.clips.push(clipInstance2);

song.play();
setTimeout(() => {
	console.log("Pausing");
	song.pause();
	setTimeout(() => {
		console.log("Resuming");
		song.play();
	}, 2500)
}, 2500);