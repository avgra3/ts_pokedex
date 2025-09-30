import { type State } from "./state.js";
import { type PokemonStat, type PokemonType, type Type } from "./pokeapi.js";

export async function commandInspect(state: State, pokemon: string): Promise<void> {
	try {
		const pokemonInspect = state.pokedex[pokemon];
		if (pokemonInspect == null) {
			console.log("you have not caught that pokemon");
			return
		}
		const name = pokemonInspect.name;
		const height = pokemonInspect.height;
		const weight = pokemonInspect.weight;
		const stats = pokemonInspect.stats;
		const types = pokemonInspect.types;

		let message = `Name: ${name}\n`;
		message += `Height: ${height}\n`;
		message += `Weight: ${weight}\n`;
		message += `Stats:\n`;
		stats.forEach((stat: PokemonStat, _) => {
			message += `- ${stat.stat.name}: ${stat.base_stat}\n`;
		});
		message += `Types:\n`;
		types.forEach((pokemonType: PokemonType, _) => {
			message += `- ${pokemonType.type.name}\n`;
		});

		console.log(message.trim());
	} catch (error) {
		console.log(`Error: ${error}`);
	}

};
