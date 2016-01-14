
import ClipInstance from "./ClipInstance";
export default class Playlist {

	public clips: ClipInstance[];
	public lanes: string[]; // the names of the lanes. lol

	constructor() {
		this.clips = [];
		this.lanes = [];
	}

	public schedule(songTime: number, lookaheadDuration: number): void {
		//console.log("Getting clips between " + songTime + " with lookahead=" + lookaheadDuration);
		// Retrieve the clips that have to be scheduled
		var clipsToSchedule = this.retrieveClipsBetween(songTime, songTime + lookaheadDuration);

		// Remove clips that are already scheduled.
		clipsToSchedule = clipsToSchedule.filter((clip: ClipInstance) => {
			return !clip.scheduled;
		});

		for (var iClip = 0; iClip < clipsToSchedule.length; iClip++) {
			var clip = clipsToSchedule[iClip];

			// Compute the delay before the clip begins
			var clipStartDelay = clip.startTime - songTime;
			clip.play(clipStartDelay);
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
