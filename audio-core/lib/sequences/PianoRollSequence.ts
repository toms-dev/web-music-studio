
import ClipSequence from "../ClipSequence";
import PianoRollSequence from "./";

export default class PianoRollSequence extends ClipSequence {

	play(startDelay: number): void {
	}

}

ClipSequence.concreteClasses["PianoRollSequence"] = PianoRollSequence;
