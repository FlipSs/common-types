import {
    contains,
    getEqualityComparer,
    IDictionary,
    IEqualityComparer,
    IKeyValuePair,
    ReadOnlyCollection,
    tryRemoveItem
} from "./internal";
import {Func} from "../types/internal";
import {Argument, TypeUtils} from "../utils/internal";

export class Dictionary<TKey, TValue> extends ReadOnlyCollection<IKeyValuePair<TKey, TValue>> implements IDictionary<TKey, TValue> {
    private readonly comparer: IEqualityComparer<TKey>;

    private items: IKeyValuePair<TKey, TValue>[];

    public constructor(items?: Iterable<IKeyValuePair<TKey, TValue>>, comparer?: IEqualityComparer<TKey>) {
        super();

        this.comparer = getEqualityComparer(comparer);
        this.items = [];

        if (!TypeUtils.isNullOrUndefined(items)) {
            for (const item of items) {
                this.set(item.key, item.value);
            }
        }
    }

    public get length(): number {
        return this.items.length;
    }

    public get keys(): ReadonlyArray<TKey> {
        return this.items.map(i => i.key);
    }

    public get values(): ReadonlyArray<TValue> {
        return this.items.map(i => i.value);
    }

    public clear(): void {
        this.items = [];
    }

    public containsKey(key: TKey): boolean {
        return contains(this.items, i => this.isMatch(i, key));
    }

    public getOrAdd(key: TKey, valueFactory: Func<TValue, TKey>): TValue {
        Argument.isNotNullOrUndefined(valueFactory, 'valueFactory');

        const item = this.find(key);
        if (TypeUtils.isNullOrUndefined(item)) {
            const value = valueFactory(key);

            this.add(key, value);

            return value;
        }

        return item.value;
    }

    public getOrDefault(key: TKey, defaultValue?: TValue): TValue | undefined {
        const item = this.find(key);
        if (TypeUtils.isNullOrUndefined(item)) {
            return defaultValue;
        }

        return item.value;
    }

    public set(key: TKey, value: TValue): void {
        const index = this.findIndex(key);
        if (index < 0) {
            this.add(key, value);
        } else {
            const oldItem = this.items[index];
            this.items[index] = {
                key: oldItem.key,
                value: value
            };
        }
    }

    public tryAdd(key: TKey, value: TValue): boolean {
        const index = this.findIndex(key);
        if (index < 0) {
            this.add(key, value);

            return true;
        }

        return false;
    }

    public tryRemove(key: TKey): boolean {
        return tryRemoveItem(this.items, i => this.isMatch(i, key));
    }

    public get(key: TKey): TValue {
        const item = this.find(key);
        if (TypeUtils.isNullOrUndefined(item)) {
            throw new Error('Item does not exists');
        }

        return item.value;
    }

    protected getValue(): IKeyValuePair<TKey, TValue>[] {
        return this.items;
    }

    private add(key: TKey, value: TValue): void {
        this.items.push({
            key,
            value
        });
    }

    private find(key: TKey): IKeyValuePair<TKey, TValue> {
        return this.items.find(i => this.isMatch(i, key));
    }

    private findIndex(key: TKey): number {
        return this.items.findIndex(i => this.isMatch(i, key));
    }

    private isMatch(item: IKeyValuePair<TKey, TValue>, key: TKey): boolean {
        return this.comparer.equals(item.key, key);
    }
}
