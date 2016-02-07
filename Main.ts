
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

// Create the channels
var snare = new Sample("sounds/snare.wav"),
	kick = new Sample( "sounds/kick3.wav");
song.channels.push(snare);
song.channels.push(kick);

var myclip = new Clip();
song.clips.push(myclip);

var snareSeq1 = new SequencerSequence([0,0,1,0, 0,0,1,0, 0,0,1,0, 1,0,0,0], 4);
snareSeq1.channel = snare;
myclip.sequences.push(snareSeq1);

var kickSeq1 = new SequencerSequence([1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,1], 4);
kickSeq1.channel = kick;
myclip.sequences.push(kickSeq1);

// Note: there is some indirection with the clipID, but it ensures that the clip is globally declared.
song.playlist.addClip(myclip.id, 4);
song.playlist.addClip(myclip.id, 8);
song.playlist.addClip(myclip.id, 12);
song.playlist.addClip(myclip.id, 16);


$("#play").click(() => {
	song.play();
});

// Simulate a pause halfway
/*setTimeout(() => {
	console.log("Pausing");
	song.pause();
	setTimeout(() => {
		console.log("Resuming");
		song.play();
	}, 2500)
}, 2500);

*/