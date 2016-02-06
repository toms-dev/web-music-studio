
import SongConfig from "./model/SongConfig";
console.log("Hello world!");

import Song from "./model/Song";
import ClipInstance from "./model/ClipInstance";
import Clip from "./model/Clip";
import SequencerSequence from "./model/sequences/SequencerSequence";
import Sample from "./model/channels/SampleChannel";

var song = new Song();

var songConfig = new SongConfig();
songConfig.bpm = 128;

var myclip = new Clip();
var myseq = new SequencerSequence([1, 0, 0, 1, 0, 0, 0]);
var sample = new Sample();
sample.filePath = "sounds/snare.wav";
myseq.channel = sample;
myclip.sequences.push(myseq);

for (var i = 0; i < 32; i++) {
	var clipInstance = new ClipInstance(4, songConfig);
	clipInstance.clip = myclip;
	clipInstance.startStep = i;
	song.playlist.clips.push(clipInstance);
}
/*var clipInstance1 = new ClipInstance(4, songConfig);
clipInstance1.clip = myclip;
clipInstance1.startStep = 4;
song.playlist.clips.push(clipInstance1);

var clipInstance2 = new ClipInstance(4, songConfig);
clipInstance2.clip = myclip;
clipInstance2.startStep = 8;
song.playlist.clips.push(clipInstance2);*/

$("#play").click(() => {
	song.play();
});

/*setTimeout(() => {
	console.log("Pausing");
	song.pause();
	setTimeout(() => {
		console.log("Resuming");
		song.play();
	}, 2500)
}, 2500);

*/