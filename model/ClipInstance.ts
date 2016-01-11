
import Clip from "./Clip";

class ClipInstance {

	public clip: Clip;

	public startTime: number;
	public truncStart: number;
	public truncEnd: number;

	play(startDelay: number): void {
		var seqs = this.clip.sequences;
		for (var i = 0; i < seqs.length; ++i) {
			var seq = seqs[i];
			seq.play(startDelay);
		}
	}

}

export default ClipInstance;