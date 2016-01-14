
import Clip from "./Clip";

class ClipInstance {

	public clip: Clip;

	public startTime: number;
	public scheduled: boolean;
	public truncStart: number;
	public truncEnd: number;

	constructor() {
		this.scheduled = false;
	}

	play(startDelay: number): void {
		this.scheduled = true;
		console.log("Scheduling clip in "+startDelay+"\t!");

		var seqs = this.clip.sequences;
		for (var i = 0; i < seqs.length; ++i) {
			var seq = seqs[i];
			seq.play(startDelay);
		}
	}

}

export default ClipInstance;