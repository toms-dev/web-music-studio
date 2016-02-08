import Clip from "./Clip";
import Channel from "./Channel";
import SongTime from "./SongTime";
import Song from "./Song";
/**
 * This is the rythmic content of a clip for one given instrument
 */
abstract class ClipSequence {

	/**
	 * The clip containing this clip sequence.
	 */
	public clip: Clip;
	public channel: Channel;

	public static concreteClasses: {[name: string]: any} = {};

	abstract play(start: SongTime, end: SongTime, startDelay: SongTime): void;

	toJSON(): any {
		return {
			channelID: this.channel.id,
			clipSequenceType: (<any> this.constructor).name,
			concreteSequenceData: this.concreteToJSON()
		}
	}

	abstract concreteToJSON(): any ;

	static fromJSON(json: any, song: Song): ClipSequence {
		// Get the class
		var clipSequenceType = ClipSequence.concreteClasses[json.clipSequenceType];
		// Call the static method
		var clipSeq = clipSequenceType.fromJSON(json.concreteSequenceData);
		clipSeq.channel = song.getChannel(json.channelID);
		console.log("Got channel("+json.channelID+"):", clipSeq.channel);
		console.log("Available channels:", song.channels);

		return clipSeq;
	}
}

export default ClipSequence;

// can be SequencerStep or PianoRoll
