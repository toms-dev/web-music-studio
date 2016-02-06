
import ClipInstance from "./ClipInstance";
export default class Playlist {

	public clips: ClipInstance[];
	public lanes: string[]; // the names of the lanes. lol

	constructor() {
		this.clips = [];
		this.lanes = [];
	}

	public schedule(songTime: number, lookaheadDuration: number, elapsedSteps: number, lookaheadSteps: number): void {
		//console.log("Getting clips between " + songTime + " with lookahead=" + lookaheadDuration);
		// Retrieve the clip instances that have to be scheduled
		//var clipsToSchedule = this.retrieveClipsBetween(songTime, songTime + lookaheadDuration);
		var clipsToSchedule = this.retrieveClipsBetween(elapsedSteps, elapsedSteps + lookaheadSteps);

		// Remove clips that are already scheduled.
		clipsToSchedule = clipsToSchedule.filter((clip: ClipInstance) => {
			return !clip.scheduled;
		});

		// Schedule all clips
		for (var iClip = 0; iClip < clipsToSchedule.length; iClip++) {
			var clipInstance = clipsToSchedule[iClip];

			//clipInstance.play(songTime, lookaheadDuration);
			clipInstance.play(elapsedSteps, lookaheadSteps);
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
			if (clip.startTime < startTime) {
				continue ;
			}

			// Stop if we got past the end of the time interval we are interested in
			if (clip.startTime > endTime) {
				break;
			}

			clips.push(clip);
		}
		return clips;
	}
}
