
console.log("Hello world!");

import Song from "./model/Song";
import ClipInstance from "./model/ClipInstance";
import Clip from "./model/Clip";
import SequencerSequence from "./model/sequences/SequencerSequence";
import Sample from "./model/channels/SampleChannel";

var song = new Song();

var myclip = new Clip();
var myseq = new SequencerSequence([1, 0, 0, 1, 0, 0, 0]);
var sample = new Sample();
sample.filePath = "sounds/snare.wav";
myseq.channel = sample;
myclip.sequences.push(myseq);

var clipInstance1 = new ClipInstance(4);
clipInstance1.clip = myclip;
clipInstance1.startTime = 4;
song.playlist.clips.push(clipInstance1);

var clipInstance2 = new ClipInstance(4);
clipInstance2.clip = myclip;
clipInstance2.startTime = 8;
//song.playlist.clips.push(clipInstance2);

song.play();
setTimeout(() => {
	console.log("Pausing");
	song.pause();
	setTimeout(() => {
		console.log("Resuming");
		song.play();
	}, 2500)
}, 2500);

