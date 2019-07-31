import {TimerState, TimeSpan} from "./internal";
import {IDisposable} from "../models/internal";

export interface ITimer extends IDisposable {
    getState(): TimerState;

    start(period: TimeSpan): void;

    stop(): void;

    restart(period: TimeSpan): void;

    suspend(): void;

    resume(): void;
}
