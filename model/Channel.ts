
import MixerTrack from "./MixerTrack";

abstract class Channel {

	public track: MixerTrack;
	public volume: number;
	public panning: number;

	public output: AudioParam; // WebAudio Param

	setup(): void {
		// TODO output = new AudioParam();
	}

	abstract trigger(note: any, duration: number): void ;

	abstract interrupt(): void ;

}

export default Channel;