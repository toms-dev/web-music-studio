
import ClipSequence from "../ClipSequence";
import SongTime from "../SongTime";

export default class SequencerSequence extends ClipSequence {

	// only 0s and 1s
	private sequence: number[];
	/**
	 * As we are representing the pattern with an array, we can specify the time scale of each element of the array
	 */
	private stepsPerBeat: number;

	constructor(sequence: number[], stepsPerBeat: number) {
		super();
		this.sequence = sequence;
		this.stepsPerBeat = stepsPerBeat;
	}

	play(start: SongTime, end: SongTime, startDelay: SongTime): void {
		console.warn("Sequencer is triggering only C notes");

		// 1 step = 1 element of the array
		var stepDuration = start.config.getStepDuration() / this.stepsPerBeat;
		//this.channel.trigger("C", 200, startDelay.toTime());

		for (var i = 0; i < this.sequence.length; ++i) {
			var activated = this.sequence[i] == 1;
			if (activated) {
				var hitDelay = startDelay.toTime() + i*stepDuration;
				this.channel.trigger("C", 200, hitDelay);
			}
		}
	}

}
