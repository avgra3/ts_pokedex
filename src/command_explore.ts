import { type State } from "./state.js";

export async function commandExplore(state: State, ...location: string[]): Promise<void> {
	try {
		// LocationArea
		const locationArea = await state.pokeAPI.fetchLocation(location.join(" "));
		const pokemonEncounters = locationArea.pokemon_encounters;
		for (const pokemonEncounter of pokemonEncounters) {
			console.log(pokemonEncounter.pokemon.name);
		}

	} catch (error) {
		throw error;
	}
};
