
import Clip from "./Clip";
import SongConfig from "./SongConfig";
import SongTimeConverter from "./utils/SongTimeConverter";

class ClipInstance {

	public clip: Clip;

	public startTime: number;
	public length: number;

	public scheduled: boolean;
	public localScheduledTime: number;

	public truncStart: number;
	public truncEnd: number;
	private config: SongConfig;

	constructor(length: number, config: SongConfig) {
		this.length = length;
		this.scheduled = false;
		this.localScheduledTime = 0;

		this.config = config;
	}

	/**
	 *
	 * @param songTime Unit: steps
	 * @param lookahead Unit: steps
	 */
	play(songTime: number, lookahead: number): void {
		console.group("Playing instance");
		console.debug("NOW/LOOKAHEAD=", songTime, lookahead);
		console.debug("START/LENGTH", this.startTime, this.length);

		var clipEndTime = this.startTime + this.length;

		// Amount of time elapsed since the beginning of the clip.
		var localElapsed = songTime - this.startTime; // TODO: + this.truncStart
		// Truncate the parts of the elapsed time that were already scheduled
		var localScheduleStart = Math.max(localElapsed, this.localScheduledTime);
		// Buffer the more we can
		var localScheduleEnd = Math.min(clipEndTime, localElapsed + lookahead);
		// Compute in how much time the clip has to start.
		var startDelay = Math.max(0, this.startTime - songTime);

		this.scheduled = true;
		console.log("Scheduling clip ["+localScheduleStart+"\tto "+localScheduleEnd+"] in "+startDelay+"!");

		var seqs = this.clip.sequences;
		for (var i = 0; i < seqs.length; ++i) {
			var seq = seqs[i];
			seq.play(localScheduleStart, localScheduleEnd, startDelay);
		}

		this.localScheduledTime = localScheduleEnd;
		console.groupEnd();
	}

}

export default ClipInstance;