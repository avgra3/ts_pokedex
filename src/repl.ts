// import { stdin, stdout } from "process"
// import { Stream } from "stream"
// import { createInterface } from "readline";
// import { commandExit } from "./command_exit.js";
// import { commandHelp } from "./command_help.js";
import { type State } from "./state.js";

export function cleanInput(input: string): string[] {
	const words = removeWhitespace(input.toLowerCase().split(" "));
	return words;
}

function removeWhitespace(input: string[]): string[] {
	const cleaned: string[] = [];
	for (const word of input) {
		if (word.trim() !== "") {
			cleaned.push(word);
		}
	}
	return cleaned;
}


export async function startREPL(state: State) {
	state.readline.prompt();
	state.readline.on("line", (line: string) => {
		const cleanedLine = line.trim().toLowerCase();
		const words = cleanedLine.split(" ");
		const cmd = state.commands[words[0]];
		if (cmd) {
			cmd.callback(state, words[1]);
		} else {
			console.log("Unknown command");
		}
		state.readline.prompt();
	});
}
