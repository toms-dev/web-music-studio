
import SongConfig from "./SongConfig";
import SongTimeConverter from "./utils/SongTimeConverter";
export default class SongTime {

	public steps: number;
	public config: SongConfig;

	public toTime(): number {
		return SongTimeConverter.songTimeToTime(this.steps, this.config);
	}

	public toSteps(): number {
		return this.steps;
	}

	public fromTime(time: number) {
		this.steps = SongTimeConverter.timeToSongTime(time, this.config);
	}

	public addTime(time: number): SongTime {
		var copy = new SongTime();
		copy.config = this.config;
		copy.fromTime(this.toTime() + time);
		return copy;
	}

}
