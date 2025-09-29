
export class PokeAPI {
	private static readonly baseURL: string = "https://pokeapi.co/docs/v2";

	constructor() { }
	async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
		let locationURL = "";
		if (typeof pageURL === "undefined") {
			locationURL = `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;
		} else {
			locationURL = pageURL;
		}
		try {
			const response = await fetch(locationURL);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const shallowLocations = await response.json() as ShallowLocations;
			return shallowLocations;
		}
		catch (error) {
			console.error(`Error fetching data: ${error}`);
			throw error;
		}
	}

	async fetchLocation(locationName: string): Promise<Location> {
		const locationURL = `${PokeAPI.baseURL}/location-area/${locationName}`;
		try {
			const response = await fetch(locationURL);
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const result = await response.json() as Location;
			return result;

		}
		catch (error) {
			console.error(`Error fetching data: ${error}`);
			throw error;
		}
	}
}

export type ShallowLocations = {
	count: number; next: string; previous?: string; results: { name: string; url: string; }[]
};

export type Location = { count: number; next: string; previous?: string; results: { name: string; url: string; }[] };
type LocationArea = {
	id: number; name: string; gameIndex: number;
	encounterMethodRates: EncounterMethodRate[]; location: Location;
	names: Name[]; pokemonEncounters: PokemonEncounter[];
};
type EncounterMethodRate = { encounterMethod: EncounterMethod; versionDetails: EncounterVersionDetails[]; };
type EncounterVersionDetails = { rate: number; version: Version; };
type PokemonEncounter = { pokemon: Pokemon; versionDetails: VersionEncounterDetail[]; };
type VersionEncounterDetail = { version: Version; maxChance: number; encounterDetails: Encounter[]; };
type Encounter = { minLevel: number; maxLevel: number; conditionValues: EncounterConditionValue[]; chance: number; method: EncounterMethod; };
type EncounterConditionValue = { id: number; name: string; condition: EncounterCondition; };
type EncounterCondition = { id: number; name: string; names: Name[]; values: EncounterConditionValue[]; };
type EncounterMethod = { id: number; name: string; order: number; names: Name[]; };
type Name = { name: string; language: Language; };
type Language = { id: number; name: string; official: boolean; iso639: string; iso3166: string; names: Name[]; }
type GenerationGameIndex = { gameIndex: number; generation: Generation; };
type Generation = { id: number; name: string; abilities: Ability[]; names: Name[], mainRegion: Region; moves: Move; pokemonSpecies: PokemonSpecies[], types: Type[], versionGroups: VersionGroup[] };
type Ability = {
	id: number;
	name: string;
	isMainSeries: boolean;
	generation: Generation;
	names: Name[];
	effectEntries: VerboseEffect[];
	effectChanges: AbilityEffectChange[];
	flavorTextEntries: AbilityFlavorText[];
	pokemon: AbilityPokemon[];
};
type AbilityFlavorText = { flavorTest: string; language: Language; versionGroup: VersionGroup; };
type AbilityPokemon = { isHidden: boolean; slot: number; pokemon: Pokemon; };
type AbilityEffectChange = { effectEntries: Effect[]; versionGroup: VersionGroup; };
type VersionGroup = {
	id: number;
	name: string;
	order: number;
	generation: Generation;
	moveLearnMethods: MoveLearnMethod[];
	pokedexes: Pokedex[];
	regions: Region[];
	versions: Version[];
}
type MoveLearnMethod = { id: number; name: string; descritions: Description[], names: Name[], versionGroups: VersionGroup[] };
type Description = { description: string, language: Language };
type Pokedex = { id: number; name: string, isMainSeries: boolean, descriptions: Description[], names: Name[], pokemonEntries: PokemonEntry[], region: Region, versionGroups: VersionGroup[]; };
type PokemonEntry = { entryNumber: number; pokemonSpecies: PokemonSpecies };
type PokemonSpecies = { id: number; name: string; order: number; genderRate: number; captureRate: number; baseHappiness: number; isBaby: boolean; isLegendary: boolean; isMythical: boolean; hatchCounter: number; hasGenderDifferences: boolean; formsSwitchable: boolean; growthRate: GrowthRate; pokedexNumbers: PokemonSpeciesDexEntry[]; eggGroups: EggGroup[]; color: PokemonColor; shape: PokemonShape; evolvesFromSpecies: PokemonSpecies; evolutionChain: EvolutionChain; habitat: PokemonHabitat; generation: Generation; names: Name[]; palParkEncounters: PalParkEncounterArea[]; flavorTextEntries: FlavorText[]; formDescriptions: Description[]; genera: Genus[]; varieties: PokemonSpeciesVariety[]; }
type GrowthRate = {
	id: number; name: string; formula: string;
	descriptions: Description[]; levels: GrowthRateExperienceLevel[];
	pokemonSpecies: PokemonSpecies[];
};
type GrowthRateExperienceLevel = { level: number; experience: number; };
type PokemonSpeciesDexEntry = { entryNumber: number; pokedex: Pokedex; };
type EggGroup = { id: number; name: string; names: Name[]; pokemonSpecies: PokemonSpecies[]; };
type PokemonColor = { id: number; name: string; names: Name[]; pokemonSpecies: PokemonSpecies[]; };
type PokemonShape = {
	id: number; name: string; awesomeNames: AwesomeName[];
	names: Name[]; pokemonSpecies: PokemonSpecies[];
};
type AwesomeName = { awesomeName: string; language: Language; };
type PokemonHabitat = { id: number; name: string; names: Name[]; pokemonSpecies: PokemonSpecies[]; };
type PalParkEncounterArea = { baseScore: number; rate: number; area: PalParkArea; };
type PalParkArea = { id: number; name: string; names: Name[]; pokemonEncounters: PalParkEncounterSpecies[]; };
type PalParkEncounterSpecies = { baseScore: number; rate: number; pokemonSpecies: PokemonSpecies; };
type PokemonSpeciesVariety = { isDefault: boolean; pokemon: Pokemon };
type Pokemon = { id: number; name: string; baseExperience: number; height: number; isDefault: boolean; order: number; weight: number; abilities: PokemonAbility[]; forms: PokemonForm[]; gameIndicies: VersionGameIndex[]; heldItems: PokemonHeldItem[]; locationAreaEncounters: string; moves: PokemonMove[]; pastTypes: PokemonTypePast[]; pastAbilities: PokemonAbilityPast; sprites: PokemonSprites; cries: PokemonCries; stats: PokemonStat[]; types: PokemonType[]; }
type PokemonForm = {
	id: number; name: string; order: number; formOrder: number;
	isDefault: boolean; isBattleOnly: boolean; isMega: boolean;
	formName: string; pokemon: Pokemon; types: PokemonFormType[];
	sprites: PokemonFormSprites; versionGroup: VersionGroup;
	names: Name[]; formNames: Name[];
};
type PokemonFormType = { slot: number; type: Type; };
type PokemonFormSprites = {
	frontDefault: string; frontShiny: string;
	backDefault: string; backShiny: string;
};
type VersionGameIndex = { gameIndex: number; version: Version; };
type PokemonHeldItem = { item: Item; versionDetails: PokemonHeldItemVersion[]; };
type PokemonHeldItemVersion = { version: Version; rarity: number; };
type PokemonMove = { move: Move; versionGroupDetails: PokemonMoveVersion[]; };
type PokemonMoveVersion = { moveLearnMethod: MoveLearnMethod; versionGroup: VersionGroup; levelLearnedAt: number; order: number; };
type PokemonTypePast = { generation: Generation; types: PokemonType[]; };
type PokemonAbility = { isHidden: boolean; slot: number; ability: Ability; };
type PokemonAbilityPast = { generation: Generation; abilities: PokemonAbility; };
type PokemonSprites = {
	frontDefault: string; frontShiny: string; frontFemale: string;
	frontShinyFemal: string; backDefault: string; backShiny: string;
	backFemale: string; backShinyFemale: string;
};
type PokemonCries = { latest: string; legacy: string; };
type PokemonStat = { stat: Stat; effort: number; baseStat: number; };
type PokemonType = { slot: number; type_: Type; };
type Type = {
	id: number; name: string; damageRelations: TypeRelations;
	pastDamageRelations: Type[]; gameIndicies: GenerationGameIndex[];
	generation: Generation; moveDamageClass: MoveDamageClass;
	names: Name[]; pokemon: TypePokemon[]; moves: Move[];
}
type TypeRelations = {
	noDamageTo: Type[]; halfDamageTo: Type[];
	doubleDamageTo: Type[]; noDamageFrom: Type[];
	halfDamageFrom: Type[]; doubleDamageFrom: Type[];
};
type Move = {
	id: number; name: string; accuracy: number;
	effectChange: number; pp: number; priority: number;
	power: number; contestCombos: ContestComboSets;
	contestType: ContestType; contestEffect: ContestEffect;
	damageClass: MoveDamageClass; effectEntries: VerboseEffect[];
	effectChanges: AbilityEffectChange[]; learnedByPokemon: Pokemon[];
	flavorTextEntries: MoveFlavorText[];
	generation: Generation; machines: MachineVersionDetail[];
	meta: MoveMetaData; names: Name[]; pastValues: PastMoveStatValues[];
	statChanges: MoveStatChange[]; superContestEffect: SuperContestEffect;
	target: MoveTarget; type: Type;
};
type ContestComboSets = { normal: ContestComboDetail; super: ContestComboDetail; };
type ContestComboDetail = { useBefore: Move[]; useAfter: Move[] };
type ContestEffect = {
	id: number; appeal: number; jam: number; effectEntries: Effect[];
	flavorTextEntries: FlavorText[];
};
type MoveFlavorText = { flavorText: string; language: Language; versionGroup: VersionGroup; };
type MoveMetaData = {
	ailment: MoveAilment; category: MoveCategory;
	minHits: number; maxHits: number; minTurns: number; maxTurns: number;
	drain: number; healing: number; critRate: number; ailmentChance: number;
	flinchChance: number; statChance: number;
};
type MoveCategory = { id: number; name: string; moves: Move[], descriptions: Description[] };
type MoveAilment = { id: number; name: string; moves: Move[]; names: Name[]; };
type PastMoveStatValues = {
	accuracy: number; effectChance: number;
	power: number; pp: number; effectEntries: VerboseEffect[];
	type: Type; versionGroup: VersionGroup;
};
type MoveStatChange = { change: number; stat: Stat; };
type Stat = {
	id: number; name: string; gameIndex: number; isBattleOnly: boolean;
	affectingMoves: MoveStatAffectSets; affectingNatures: NatureStatAffectSets;
	characteristics: Characteristic[]; moveDamageClass: MoveDamageClass; names: Name[];
};
type MoveStatAffectSets = { increase: MoveStatAffect[]; decrease: MoveStatAffect[]; };
type MoveStatAffect = { change: number; move: Move; };
type NatureStatAffectSets = { increase: Nature[]; decrease: Nature[] };
type Nature = {
	id: number; name: string; decreasedStat: Stat; increasedStat: Stat;
	hatesFlavor: BerryFlavor; likesFlavor: BerryFlavor; pokeathlonStatChanges: NatureStatChange[];
	moveBattleStylePreferences: MoveBattleStylePreference[];
	names: Name[];
};
type BerryFlavor = {
	id: number; name: string; berries: FlavorBerryMap[];
	contestType: ContestType; names: Name[];
};
type ContestType = {
	id: number; name: string; berryFlavor: BerryFlavor;
	names: ContestName[];
};
type FlavorBerryMap = { potency: number; berry: Berry; };
type Berry = {
	id: number; name: string; growthTime: number;
	maxHarvest: number; naturalGiftPower: number; size: number;
	smoothness: number; soilDryness: number;
	firmness: BerryFirmness; flavors: BerryFlavorMap[];
	item: Item; naturalGiftType: Type;
};
type BerryFlavorMap = { potency: number; flavor: BerryFlavor; };
type BerryFirmness = { id: number; name: string; berries: Berry; names: Name[]; };
type Item = {
	id: number; name: string; cost: number; flingPower: number;
	flingEffect: ItemFlingEffect; attributes: ItemAttribute[];
	category: ItemCategory; effectEntries: VerboseEffect[];
	flavorTextEntries: FlavorText[]; gameIndices: GenerationGameIndex[];
	names: Name[]; sprites: ItemSprites; heldByPokemon: ItemHolderPokemon[];
	babyTriggerFor: EvolutionChain; machines: MachineVersionDetail[];
};
type ItemFlingEffect = {
	id: number; name: string; effectEntries: Effect[];
	items: Item[];
};
type ItemAttribute = {
	id: number; name: string; items: Item[]; names: Name[];
	descriptions: Description[];
};
type ItemCategory = {
	id: number; name: string; items: Item[];
	names: Name[]; pocket: ItemPocket;
};
type ItemPocket = {
	id: number; name: string; categories: ItemCategory[];
	names: Name[];
};
type EvolutionChain = { id: number; babyTriggerItem: Item; chain: ChainLink; };
type ChainLink = { isBaby: boolean; species: PokemonSpecies; evolutionDetails: EvolutionDetail[]; evolvesTo: ChainLink[]; };
type EvolutionDetail = {
	item: Item; trigger: EvolutionTrigger; gender: number; heldItem: Item; knownMove: Move; knownMoveType: Type; location: Location; minLevel: number;
	minHappiness: number; minBeauty: number; minAffection: number;
	needsOverworldRain: boolean; partySpecies: PokemonSpecies;
	partyType: Type; relativePhysicalStats: number; timeOfDay: string;
	tradeSpecies: PokemonSpecies; turnUpsideDown: boolean;
};
type EvolutionTrigger = { id: number; name: string; names: Name[]; pokemonSpecies: PokemonSpecies[]; };
type MachineVersionDetail = { machine: Machine; versionGroup: VersionGroup; };
type Machine = { id: number; item: Item; move: Move; versionGroup: VersionGroup; };
type ItemHolderPokemon = { pokemon: Pokemon; versionDetails: ItemHolderPokemonVersionDetail[]; };
type ItemHolderPokemonVersionDetail = { rarity: number; version: Version; };
type ItemSprites = { default: string; };
type ContestName = { name: string; color: string; language: Language; };
type NatureStatChange = { maxChange: number; pokeathelonStat: PokeathelonStat; };
type PokeathelonStat = { id: number; name: string; names: Name[]; affectingNatures: NaturePokeathelonStatAffectSets; };
type NaturePokeathelonStatAffectSets = {
	increase: NaturePokeathelonStatAffect[];
	decrease: NaturePokeathelonStatAffect[];
};
type NaturePokeathelonStatAffect = { maxChange: number; nature: Nature; };
type MoveBattleStylePreference = {
	lowHpPreference: number; highHpPreference: number;
	moveBattleStyle: MoveBattleStyle;
};
type MoveBattleStyle = { id: number; name: string; names: Name[]; };
type NamedAPIResrouce = {};
type Characteristic = {
	id: number; geneModulo: number; possibleValues: number[];
	highestStat: Stat; descriptions: Description[];
};
type MoveDamageClass = {
	id: number; name: string; descriptions: Description[];
	move: Move[]; names: Name[]
};
type SuperContestEffect = { id: number; appeal: number; flavorTextEntries: FlavorText[]; };
type FlavorText = { flavorText: string; language: Language; version: Version; };
type MoveTarget = { id: number; name: string; descriptions: Description[]; moves: Move[]; names: Name[]; };
type TypePokemon = { slot: number; pokemon: Pokemon; };
type Genus = { genus: string; language: Language };
type Region = { id: number; locations: Location[]; name: string; names: Name[]; mainGeneration: Generation; pokedexes: Pokedex[]; versionGroups: VersionGroup; };
type Version = { id: number; name: string; names: Name[]; };
type Effect = { effect: string, language: Language };
type VerboseEffect = { effect: string, shortEffect: string; language: Language; };
