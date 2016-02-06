
import ClipSequence from "../ClipSequence";

export default class SequencerSequence extends ClipSequence {

	// only 0s and 1s
	private sequence: number[];

	constructor(sequence: number[]) {
		super();
		this.sequence = sequence;
	}

	play(start: number, end: number, startDelay: number): void {
		console.log("Trigger C");
		this.channel.trigger("C", 200, startDelay);
	}

}
