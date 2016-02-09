
import MixerTrack from "./MixerTrack";
import SampleChannel from "./channels/SampleChannel";
import VSTChannel from "./channels/VSTChannel";

abstract class Channel {

	public track: MixerTrack;
	public volume: number;
	public panning: number;

	public name: string;

	public output: AudioParam;

	public id: number;
	public static idAutoIncrement: number = 1;

	public static concreteClasses: {[name: string]: any} = {};

	constructor(id: number = null) {
		if (id == null) {
			id = Channel.idAutoIncrement++;
		}
		this.id = id;
		this.name = "DefaultChannelName";
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
			id: this.id,
			volume: this.volume,
			panning: this.panning,
			name: this.name,
			// that's so ugly lol
			concreteChannelData: this.concreteToJSON(),
			concreteChannelType: (<any> this.constructor).name
		}
	}

	/**
	 * Returns the data from the concrete class implementing the channel.
	 */
	abstract concreteToJSON(): any;

	static fromJSON(json: any): Channel {
		var concreteClass = Channel.concreteClasses[(<any> json.concreteChannelType)];
		var channel = concreteClass.fromJSON(json.concreteChannelData);

		channel.id = json.id;
		channel.volume = json.volume;
		channel.panning = json.panning;
		channel.name = json.name;

		return channel;
	}

}

export default Channel;