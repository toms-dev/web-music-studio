
import MixerTrack from "./MixerTrack";

abstract class Channel {

	public track: MixerTrack;
	public volume: number;
	public panning: number;

	public output: AudioParam;

	public id: number;
	public static idAutoIncrement: number = 1;

	constructor(id: number = null) {
		if (id == null) {
			id = Channel.idAutoIncrement++;
		}
		this.id = id;
		this.volume = 1;
		this.panning = 0;
	}

	// WebAudio Param

	setup(): void {
		// TODO output = new AudioParam();
	}

	abstract trigger(note: any, duration: number, startDelay: number): void ;

	abstract interrupt(): void ;

	public toJSON(): any {
		return {
			volume: this.volume,
			panning: this.panning,
			// that's so ugly lol
			concreteChannel: this.concreteToJSON(),
			concreteChannelType: (<any> this.constructor).name
		}
	}

	/**
	 * Returns the data from the concrete class implementing the channel.
	 */
	abstract concreteToJSON(): any;

}

export default Channel;