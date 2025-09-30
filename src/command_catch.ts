import { type State } from "./state.js";

export async function commandCatch(state: State, pokemon: string): Promise<void> {
	try {
		// Try to catch a Pokemon
		console.log(`Throwing a Pokeball at ${pokemon}...`);
		const pokemonWanted = await state.pokeAPI.fetchPokemon(pokemon);
		const ourChances = Math.floor(2 * Math.random() * pokemonWanted.base_experience);
		if (ourChances >= pokemonWanted.base_experience) {
			state.pokedex[pokemon] = pokemonWanted;
			console.log(`${pokemon} was caught!`);
		} else {
			console.log(`${pokemon} escaped!`);
		}
	} catch (error) {
		throw error;
	}

};
