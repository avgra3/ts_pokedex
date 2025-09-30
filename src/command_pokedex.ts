import { type State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
	try {
		const pokedex = state.pokedex;
		if (Object.keys(pokedex).length === 0) {
			console.log("You have not caught any Pokemon. Try catching some!");
			return
		}
		let message = "Your Pokedex:\n";
		for (const key in pokedex) {
			message += `- ${pokedex[key].name}\n`;
		}
		console.log(message.trim());
	} catch (error) {
		console.log(`Error: ${error}`);
	}
};
