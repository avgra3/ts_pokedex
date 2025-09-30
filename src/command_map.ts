import { type State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
	try {
		const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
		state.nextLocationsURL = locations.next;
		state.prevLocationsURL = locations.previous;
		let message: string = "";
		if (typeof state.prevLocationsURL === "undefined"
			|| state.prevLocationsURL === null) {
			message += "you're on the first page\n";
		}
		for (const result of locations.results) {
			message += result.name + "\n";
		}
		console.log(message);
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}

export async function commandMapB(state: State): Promise<void> {
	try {
		if (typeof state.prevLocationsURL === "undefined"
			|| state.prevLocationsURL === null) {
			throw new Error("No previous page. Did you mean to go to the next page?");
		}
		const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
		state.nextLocationsURL = locations.next;
		if (typeof locations.previous !== "undefined"
			|| state.prevLocationsURL === null) {
			state.prevLocationsURL = locations.previous;
		}
		let message: string = "";
		if (typeof state.prevLocationsURL === "undefined"
			|| state.prevLocationsURL === null) {
			message += "you're on the first page\n";
		}
		for (const result of locations.results) {
			message += result.name + "\n";
		}
		process.stdout.write(message);
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error("An error occured:", error.message);
		}
		else {
			console.log(`An unknown error occured: ${error}\n`);
		}
	}
}

