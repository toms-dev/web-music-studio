
import ClipSequence from "./ClipSequence";

export default class Clip {

	public sequences: ClipSequence[];

	public id: number;
	private static idAutoIncrement: number = 1;

	constructor() {
		this.id = Clip.idAutoIncrement++;
		this.sequences = [];
	}

	toJSON(): any {
		return {
			sequences: this.sequences.map((s: ClipSequence) => { return s.toJSON()})
		}
	}
}
