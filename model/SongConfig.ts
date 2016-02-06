
export default class SongConfig {

	public bpm: number;

	getStepDuration(): number {
		var beatsPerSeconds = this.bpm/60;
		return 1000/beatsPerSeconds;
	}
}
