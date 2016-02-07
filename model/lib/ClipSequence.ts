import Clip from "./Clip";
import Channel from "./Channel";
import SongTime from "./SongTime";
/**
 * This is the rythmic content of a clip for one given instrument
 */
abstract class ClipSequence {

	/**
	 * The clip containing this clip sequence.
	 */
	public clip: Clip;
	public channel: Channel;

	abstract play(start: SongTime, end: SongTime, startDelay: SongTime): void;

	toJSON(): any {
		return {
			channelID: this.channel.id,
			clipSequenceType: (<any> this.constructor).name,
			concreteSequenceData: this.concreteToJSON()
		}
	}

	abstract concreteToJSON(): any ;
}

export default ClipSequence;

// can be SequencerStep or PianoRoll
