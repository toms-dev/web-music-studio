
import Channel from "../Channel";

export default class SampleChannel extends Channel {

	public filePath: string;

	trigger(note: any, duration: number, startDelayMS: number): void {
		console.log("Playing sound "+this.filePath+"  in "+startDelayMS+" ms");

		var sound = (<any>window).getSoundInstance(this.filePath);
		var audioCtx = (<any>window).audioCtx;
		sound.start(audioCtx.currentTime + startDelayMS/1000);
	}

	interrupt(): void {
	}

}
