export type CacheEntry<T> = {
	createdAt: number; // Milliseconds from Date.now();
	val: T; // Object we are caching;
};

export class Cache {
	#cache = new Map<string, CacheEntry<any>>();
	#reapIntervalID: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(interval: number) {
		this.#interval = interval;
		this.#startReapLoop();
	}

	add<T>(key: string, val: T) {
		const value = { createdAt: Date.now(), val: val };
		this.#cache.set(key, value);
	}

	get<T>(key: string): CacheEntry<T> | undefined {
		const value = this.#cache.get(key);
		return value?.val;
	}

	#reap() {
		// Delete entries older than the interval:
		const interval = Date.now() - this.#interval;
		this.#cache.forEach((value: CacheEntry<any>, key: string) => {
			if (value.createdAt <= interval) {
				this.#cache.delete(key);
			}
		});
	}

	#startReapLoop() {
		this.#reapIntervalID = setInterval(() => {
			this.#reap();
		}, this.#interval);
	}

	stopReapLoop() {
		clearInterval(this.#reapIntervalID);
		this.#reapIntervalID = undefined;
	}
}


