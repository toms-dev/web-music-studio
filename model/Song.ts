
import User from "./User";
import Playlist from "./Playlist";
import SongConfig from "./SongConfig";
import SongTimeConverter from "./utils/SongTimeConverter";
import SongTime from "./SongTime";

export default class Song {

	public name:string;
	public user: User;
	public playlist: Playlist;

	public config: SongConfig;

	//private loopFrequency = 2;
	private loopFrequency = 50;
	private loopInterval: number;
	private lastResumeTime: number;

	/**
	 * Local time elapsed when the last pause was triggered.
	 */
	private lastPauseElapsed: number;
	private lastUpdate: number;

	constructor() {
		this.config = new SongConfig();
		this.playlist = new Playlist();
		this.lastPauseElapsed = 0;

		this.setupDefaultConfig();
	}

	private setupDefaultConfig(): void {
		this.config.bpm = 128;
	}

	public play(): void {
		this.lastResumeTime = Date.now();
		this.lastUpdate = Date.now();
		this.loopInterval = setInterval(() => {
			this.loop();
		}, 1000/this.loopFrequency);
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
		// Get elapsed time in ms
		var elapsedTime = this.getElapsedTime(now);
		// Convert it to a SongTime object
		var elapsed = SongTime.fromTime(elapsedTime, this.config);

		console.log("Tick (delta:"+delta+"\t | time:"+elapsedTime+" | steps:"+elapsed.toSteps());

		var lookaheadDuration = 2000;
		var lookahead = SongTime.fromTime(lookaheadDuration, this.config);

		this.schedule(elapsed, lookahead);

		this.lastUpdate = now;
	}

	private schedule(songTime: SongTime, lookaheadDuration: SongTime): void {
		this.playlist.schedule(songTime, lookaheadDuration);
	}

}
