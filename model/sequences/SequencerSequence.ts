
import ClipSequence from "../ClipSequence";
import SongTime from "../SongTime";

export default class SequencerSequence extends ClipSequence {

	// only 0s and 1s
	private sequence: number[];

	constructor(sequence: number[]) {
		super();
		this.sequence = sequence;
	}

	play(start: SongTime, end: SongTime, startDelay: SongTime): void {
		console.log("Trigger C");
		this.channel.trigger("C", 200, startDelay.toTime());
	}

}
