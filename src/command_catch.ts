import { type State } from "./state.js";

export async function commandCatch(state: State, pokemon: string): Promise<void> {
	try {
		if (typeof pokemon === "undefined") {
			console.log("No pokemon provided. Try again.");
			return
		}
		// Try to catch a Pokemon
		console.log(`Throwing a Pokeball at ${pokemon}...`);
		const pokemonWanted = await state.pokeAPI.fetchPokemon(pokemon);
		const ourChances = Math.floor(2 * Math.random() * pokemonWanted.base_experience);
		if (ourChances >= pokemonWanted.base_experience) {
			state.pokedex[pokemon] = pokemonWanted;
			console.log(`${pokemon} was caught!\nYou may now inspect it with the inspect command.`);
		} else {
			console.log(`${pokemon} escaped!`);
		}
	} catch (error) {
		console.log(`Error: ${error}`);
	}

};
