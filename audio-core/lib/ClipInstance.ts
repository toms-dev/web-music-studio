
import Clip from "./Clip";
import SongConfig from "./SongConfig";
import SongTimeConverter from "./utils/SongTimeConverter";
import SongTime from "./SongTime";
import Song from "./Song";

class ClipInstance {

	public clip: Clip;

	public startStep: number;
	public length: number;

	public laneID: number;

	public scheduled: boolean;
	public localScheduledStep: number;

	public truncStart: number;
	public truncEnd: number;

	constructor(clip: Clip, length: number, laneID: number) {
		this.clip = clip;
		this.length = length;
		this.laneID = laneID;

		this.reset();
	}

	reset(): void {
		this.scheduled = false;
		this.localScheduledStep = 0;
	}

	/**
	 *
	 * @param songTime Unit: steps
	 * @param lookahead Unit: steps
	 */
	play(songTime: SongTime, lookahead: SongTime): void {
		var songSteps = songTime.steps,
			lookaheadSteps = lookahead.toSteps();

		console.group("Playing instance");
		console.debug("NOW/LOOKAHEAD=", songSteps, lookaheadSteps);
		console.debug("START/LENGTH", this.startStep, this.length);

		var clipEndStep = this.startStep + this.length;

		// Amount of time elapsed since the beginning of the clip.
		var localElapsedSteps = songSteps - this.startStep; // TODO: + this.truncStart
		// Truncate the parts of the elapsed time that were already scheduled
		var localScheduleStartSteps = Math.max(localElapsedSteps, this.localScheduledStep),
			localScheduleStart = new SongTime(localScheduleStartSteps, songTime.config);
		// Buffer the more we can
		var localScheduleEndSteps = Math.min(clipEndStep, localElapsedSteps + lookaheadSteps);
		var localScheduleEnd = new SongTime(localScheduleEndSteps, songTime.config);

		// Compute in how much time the clip has to start.
		var startDelaySteps = Math.max(0, this.startStep - songSteps),
			startDelay = new SongTime(startDelaySteps, songTime.config);

		this.scheduled = true;
		console.log("Scheduling clip ["+localScheduleStartSteps+"\tto "+localScheduleEndSteps+"] in "+startDelaySteps+"!");

		var seqs = this.clip.sequences;
		for (var i = 0; i < seqs.length; ++i) {
			var seq = seqs[i];
			seq.play(localScheduleStart, localScheduleEnd, startDelay);
		}

		this.localScheduledStep = localScheduleEndSteps;
		console.groupEnd();
	}

	toJSON(): any {
		return {
			clipID: this.clip.id,
			startStep: this.startStep,
			length: this.length,
			laneID: this.laneID
		}
	}

	static fromJSON(json: any, song: Song): ClipInstance {
		var instance = new ClipInstance(null, 0, 0);
		instance.clip = song.getClip(json.clipID);
		instance.startStep = json.startStep;
		instance.length = json.length;
		instance.laneID = json.laneID;
		return instance;
	}

}

export default ClipInstance;