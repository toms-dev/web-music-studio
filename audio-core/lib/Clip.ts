
import ClipSequence from "./ClipSequence";
import Song from "./Song";

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

	static fromJSON(json: any, song: Song): Clip {
		var clip = new Clip();

		clip.sequences = json.sequences.map((seqData: any) => { return ClipSequence.fromJSON(seqData, song)});

		return clip;
	}
}
