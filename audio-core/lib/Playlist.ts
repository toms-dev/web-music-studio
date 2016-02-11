import ClipInstance from "./ClipInstance";
import SongTime from "./SongTime";
import SongTimeConverter from "./utils/SongTimeConverter";
import Clip from "./Clip";
import Song from "./Song";

export default class Playlist {

	public clips: ClipInstance[];
	public lanes: string[];
	private song: Song;
	// the names of the lanes. lol

	constructor(song: Song) {
		this.song = song;
		this.clips = [];
		this.lanes = [];
	}

	public schedule(songTime: SongTime, lookahead: SongTime): void {
		var elapsedSteps = songTime.toSteps(),
			lookaheadSteps = lookahead.toSteps();
		//console.debug("PLAYLIST: Getting clips between " + elapsedSteps + " with lookahead=" + lookaheadSteps+ " (steps units)");

		// Retrieve the clip instances that have to be scheduled
		var clipsToSchedule = this.retrieveClipsBetween(elapsedSteps, elapsedSteps + lookaheadSteps);

		// Remove clips that are already scheduled.
		clipsToSchedule = clipsToSchedule.filter((clip: ClipInstance) => {
			return !clip.scheduled;
		});
		if (clipsToSchedule.length > 0) console.debug("PLAYLIST: Clips to schedule: "+clipsToSchedule.length);

		// Schedule all clips
		for (var iClip = 0; iClip < clipsToSchedule.length; iClip++) {
			var clipInstance = clipsToSchedule[iClip];

			//clipInstance.play(songTime, lookaheadDuration);
			clipInstance.play(songTime, lookahead);
		}
	}

	/**
	 * Retrieves all the clip instances that are starting between startTime and endTime, both included.
	 * @param startTime
	 * @param endTime
	 * @returns {ClipInstance[]}
	 */
	public retrieveClipsBetween(startTime: number, endTime: number): ClipInstance[] {
		var clips: ClipInstance[] = [];

		// Clips are sorted by starting time
		for (var iClip = 0; iClip < this.clips.length; ++iClip) {
			var clip = this.clips[iClip];
			// Skip clips until we reach the right start time
			if (clip.startStep < startTime) {
				continue ;
			}

			// Stop if we got past the end of the time interval we are interested in
			if (clip.startStep > endTime) {
				//break;
				continue;
			}

			clips.push(clip);
		}
		return clips;
	}

	addClip(clipID: number, startStep: number, laneID: number): void {
		var clip = this.song.getClip(clipID);
		var instance = new ClipInstance(clip, 4, laneID);
		instance.startStep = startStep;
		this.clips.push(instance)
	}

	getClipInstance(startStep: number, laneID: number): ClipInstance {
		for(let i in this.clips) {
			let clip = this.clips[i];
			if(clip.startStep === startStep && clip.laneID === laneID) {
				return clip;
			}
		}
		return null;
	}

	removeClipInstance(clipInstance: ClipInstance): void {
		this.clips = this.clips.filter((c) => {
			return !(c.clip.id === clipInstance.clip.id && c.laneID === clipInstance.laneID && c.startStep === clipInstance.startStep);
		});
	}

	stop(): void {
		for (var i in this.clips) {
			if (! this.clips.hasOwnProperty(i)) continue;
			var clipInstance = this.clips[i];
			clipInstance.reset();
		}
	}

	toJSON(): any {
		return {
			clipsInstances: this.clips.map((c: ClipInstance) => {return c.toJSON();})
		}
	}

	static fromJSON(json: any, song: Song): Playlist {
		var playlist = new Playlist(song);
		playlist.clips = json.clipsInstances.map((clipInstanceData: any) => { return ClipInstance.fromJSON(clipInstanceData, song)});
		return playlist;
	}

	isFinishedAt(currentStep: SongTime): boolean {
		for (var i = 0; i < this.clips.length; ++i) {
			var c = this.clips[i];
			// If any clips ends after the current step, the song is not finished
			if (c.startStep + c.length > currentStep.toSteps()) {
				console.log("The end! On: ", c);
				console.log("The end! @ ", currentStep);
				return false;
			}
		}
		return true;
	}
}
