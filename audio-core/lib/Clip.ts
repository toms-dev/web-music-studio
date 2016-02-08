
import ClipSequence from "./ClipSequence";
import Song from "./Song";

export default class Clip {

	public sequences: ClipSequence[];

	public id: number;
	public name: string;
	private static idAutoIncrement: number = 1;

	constructor(name: string) {
		this.id = Clip.idAutoIncrement++;
		this.name = name;
		this.sequences = [];
	}

	toJSON(): any {
		return {
			id: this.id,
			name: this.name,
			sequences: this.sequences.map((s: ClipSequence) => { return s.toJSON()})
		}
	}

	static fromJSON(json: any, song: Song): Clip {
		var clip = new Clip(json.name);

		clip.id = json.id;
		clip.sequences = json.sequences.map((seqData: any) => { return ClipSequence.fromJSON(seqData, song)});

		--Clip.idAutoIncrement;

		return clip;
	}
}
