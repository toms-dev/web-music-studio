
import SongConfig from "./SongConfig";
import SongTimeConverter from "utils/SongTimeConverter";
export default class SongTime {

	public steps: number;
	public config: SongConfig;

	constructor(steps: number, config: SongConfig) {
		this.steps = steps;
		this.config = config;
	}

	public toTime(): number {
		return SongTimeConverter.songTimeToTime(this.steps, this.config);
	}

	public toSteps(): number {
		return this.steps;
	}

	public setFromTime(time: number): void {
		this.steps = SongTimeConverter.timeToSongTime(time, this.config);
	}

	public addTime(time: number): SongTime {
		var copy = new SongTime(this.steps, this.config);
		copy.setFromTime(this.toTime() + time);
		return copy;
	}

	static fromTime(time: number, config: SongConfig): SongTime {
		var songTime = new SongTime(0, config);
		songTime.setFromTime(time);
		return songTime;
	}

}
