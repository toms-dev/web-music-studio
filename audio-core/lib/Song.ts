import User from "./User";
import Playlist from "./Playlist";
import SongConfig from "./SongConfig";
import SongTime from "./SongTime";
import Channel from "./Channel";
import Clip from "./Clip";

export default class Song {

	public log: boolean = false;

	public name:string;
	public author: User;
	public playlist: Playlist;

	public config: SongConfig;

	//private loopFrequency = 2;
	private loopFrequency = 50;
	private loopInterval: NodeJS.Timer;
	private lastResumeTime: number;

	/**
	 * Local time elapsed when the last pause was triggered.
	 */
	private lastPauseElapsed: number;
	private lastUpdate: number;

	public channels: Channel[];
	public clips: Clip[];

	constructor() {
		this.name = "DefaultSongName";
		this.config = new SongConfig();
		this.playlist = new Playlist(this);
		this.channels = [];
		this.clips = [];
		this.author = null;
		this.lastPauseElapsed = 0;

		this.setupDefaultConfig();
	}

	getChannel(channelID: number): Channel {
		for (var i in this.channels) {
			if (! this.channels.hasOwnProperty(i)) continue;
			var channel = this.channels[i];
			if (channel.id == channelID) {
				return channel;
			}
		}
		return null;
	}

	getClip(clipID: number): Clip {
		for (var i in this.clips) {
			if (! this.clips.hasOwnProperty(i)) continue;
			var clip = this.clips[i];
			if (clip.id == clipID) {
				return clip;
			}
		}
		return null;
	}

	private setupDefaultConfig(): void {
		this.config.bpm = 128;
	}

	public play(): void {
		this.lastResumeTime = Date.now();
		this.lastUpdate = Date.now();
		// Immediately trigger loop
		this.loop();
		// Keep triggering the loop
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
		this.pause();
		this.playlist.stop();
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

		if (this.log) console.log("Tick (delta:"+delta+"\t | time:"+elapsedTime+" | steps:"+elapsed.toSteps());

		// Stop if the track is finished
		if (this.playlist.isFinishedAt(elapsed)) {
			this.stop();
			return;
		}

		var lookaheadDuration = 2000;
		var lookahead = SongTime.fromTime(lookaheadDuration, this.config);

		this.schedule(elapsed, lookahead);

		this.lastUpdate = now;
	}

	private schedule(songTime: SongTime, lookaheadDuration: SongTime): void {
		this.playlist.schedule(songTime, lookaheadDuration);
	}

	public toJSON(): any {
		return {
			name: this.name,
			author: this.author.email,
			config: this.config.toJSON(),
			playlist: this.playlist.toJSON(),
			channels: this.channels.map((c: Channel) => { return c.toJSON();}),
			clips: this.clips.map((c: Clip) => { return c.toJSON()})
		}
	}

	public static fromJSON(json: any): Song {
		var song = new Song();
		song.name = json.name;

		var author = new User();
		author.email = json.author;
		song.author = author;

		song.config = SongConfig.fromJSON(json.config);
		// The order of parsing is important in order to hydrate from IDs onward! ;)
		song.channels = json.channels.map((channelData: any) => { return Channel.fromJSON(channelData)});
		song.clips = json.clips.map((clipData: any) => { return Clip.fromJSON(clipData, song)});
		song.playlist = Playlist.fromJSON(json.playlist, song);

		return song;
	}

}
