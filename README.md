# Pokedex

## What is this?

This is a CLI app to search different regions in the Pokemon universe, catch Pokemon, inspect them and see all currently caught.

## How?

This app connects to the [Pokemon api](https://pokeapi.co/docs/v2#pokemon) and parses the results. To avoid making too many calls to the API, a caching system is in place. This both helps to avoid too many calls to the API, but also makes getting back responses faster if they were already made, making the user experience better.

This project was implemented using TypeScript and Node.

## Running

To run, use the [Makefile](./Makefile), running `make help` to see commands.

## Credits

This project outline comes from [Boot.dev](boot.dev).
