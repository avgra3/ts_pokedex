import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js"

import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeAPI: PokeAPI;
	nextLocationsURL: string;
	prevLocationsURL?: string;
};

// Readline interface
export function initState() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "> ",
	});

	const commandsRegistry = {
		help: {
			name: "help",
			description: "Displays a help message",
			callback: commandHelp,
		},
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		map: {
			name: "map",
			description: "Display names of 20 location in Pokemon world.",
			callback: commandMap,
		},
		mapb: {
			name: "map back",
			description: "Display the previous names of 20 locations in Pokemon world.",
			callback: commandMapB,
		},
		explore: {
			name: "explore",
			description: "Explore a location",
			callback: commandExplore,
		}
		// We can add more commands here
	};

	const pokeAPI = new PokeAPI();

	const state: State = {
		readline: rl,
		commands: commandsRegistry,
		pokeAPI: pokeAPI,
		nextLocationsURL: "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20",
	};
	return state;
};
