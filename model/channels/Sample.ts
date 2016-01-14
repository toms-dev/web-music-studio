
import Channel from "../Channel";

export default class SampleChannel extends Channel {

	public filePath: string;

	trigger(note: any, duration: number, startDelay: number): void {
		console.log("Playing sound "+this.filePath+"  in "+startDelay+" ms");
	}

	interrupt(): void {
	}

}
