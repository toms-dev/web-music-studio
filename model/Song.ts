
import User from "./User";
import Playlist from "./Playlist";
export default class Song {

	public name:string;
	public user: User;
	public playlist: Playlist;

	private loopInterval: number;
	private lastResumeTime: number;
	/**
	 * Local time elapsed when the last pause was triggered.
	 */
	private lastPauseElapsed: number;
	private lastUpdate: number;

	constructor() {
		this.playlist = new Playlist();
		this.lastPauseElapsed = 0;
	}

	public play(): void {
		this.lastResumeTime = Date.now();
		this.lastUpdate = Date.now();
		this.loopInterval = setInterval(() => {
			this.loop();
		}, 1000)
	}

	public pause(): void {
		// Update elapsed time
		this.lastPauseElapsed = this.getElapsedTime(this.lastUpdate);
		console.log("Elapsed: " + this.lastPauseElapsed);
		clearInterval(this.loopInterval);
	}

	public stop(): void {
		this.lastPauseElapsed = 0;
	}

	private getElapsedTime(now: number): number {
		return now - this.lastResumeTime + this.lastPauseElapsed;
	}

	public loop(): void {
		var now = Date.now();
		var delta = now - this.lastUpdate;
		var elapsed = this.getElapsedTime(now);
		console.log("Tick (delta:"+delta+"\t | time:"+elapsed+")");

		var lookaheadDuration = 2000;
		this.schedule(elapsed, lookaheadDuration);

		this.lastUpdate = now;
	}

	private schedule(songTime: number, lookaheadDuration: number): void {
		this.playlist.schedule(songTime, lookaheadDuration);
	}

}
