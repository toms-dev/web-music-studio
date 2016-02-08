
import Channel from "../Channel";

export default class VSTChannel extends Channel {

	trigger(note: any, duration: number): void {
	}

	interrupt(): void {
	}

	concreteToJSON(): any {
		throw new Error("Not implemented!");
	}

}

Channel.concreteClasses["VSTChannel"] = VSTChannel;