
import ClipSequence from "../ClipSequence";

export default class SequencerSequence extends ClipSequence {

	play(startDelay: number): void {
		this.channel.trigger("C", 200, startDelay);
	}

}
