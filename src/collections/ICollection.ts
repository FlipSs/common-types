import {IReadOnlyCollection} from "./IReadOnlyCollection";

export interface ICollection<T> extends IReadOnlyCollection<T> {
    add(value: T): void;

    tryRemove(value: T): boolean;

    clear(): void;
}