
export default class SongConfig {

	public bpm: number;

	getStepDuration(): number {
		var beatsPerSeconds = this.bpm/60;
		return 1000/beatsPerSeconds;
	}

	toJSON(): any {
		return {
			bpm: this.bpm
		}
	}

	static fromJSON(json: any): SongConfig {
		var config = new SongConfig();
		config.bpm = json.bpm;
		return config;
	}

}
