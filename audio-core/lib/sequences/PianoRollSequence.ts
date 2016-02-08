
import ClipSequence from "../ClipSequence";
import SongTime from "../SongTime";

export default class PianoRollSequence extends ClipSequence {

	play(start: SongTime, end: SongTime, startDelay: SongTime): void {
	}

	concreteToJSON(): any {
		return undefined;
	}

}

ClipSequence.concreteClasses["PianoRollSequence"] = PianoRollSequence;
