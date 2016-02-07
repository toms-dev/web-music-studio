
import SongConfig from "../SongConfig";
export default class SongTimeConverter {

	static timeToSongTime(time: number, config: SongConfig): number {
		var bpm = config.bpm;
		var minute = 60*1000;
		var beatDuration = minute/bpm ;
		return time/beatDuration;
	}

	static songTimeToTime(songTime: number, config: SongConfig): number {
		var bpm = config.bpm;
		var minute = 60*1000;
		var beatDuration = minute/bpm ;
		return songTime * beatDuration;
	}

}