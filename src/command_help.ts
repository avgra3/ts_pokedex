import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
	const commands = state.commands;
	let message: string = "Welcome to the Pokedex!\nUsage:\n";
	Object.entries(commands).forEach(([_, value]) => {
		message += `\n${value.name}: ${value.description}`;
	});
	message += "\n"
	process.stdout.write(message);
}
