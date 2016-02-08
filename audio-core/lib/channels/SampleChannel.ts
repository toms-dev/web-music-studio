
import Channel from "../Channel";

export default class SampleChannel extends Channel {

	public filePath: string;

	constructor(filePath: string) {
		super();
		this.filePath = filePath;
	}

	trigger(note: any, duration: number, startDelayMS: number): void {
		console.log("Playing sound "+this.filePath+"  in "+startDelayMS+" ms");

		var sound = (<any>window).getSoundInstance(this.filePath);
		var audioCtx = (<any>window).audioCtx;
		sound.start(audioCtx.currentTime + startDelayMS/1000);
	}

	interrupt(): void {
	}

	concreteToJSON(): any {
		return {
			filePath: this.filePath
		};
	}

	static fromJSON(json: any): any {
		var sample = new SampleChannel(null);
		sample.filePath = json.filePath;
		return sample;
	}
}

Channel.concreteClasses["SampleChannel"] = SampleChannel;
