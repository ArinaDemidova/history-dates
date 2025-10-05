import {HistoryEvent} from "./HistoryEvent";

export type HistoryInterval = {
    yearStart: number,
    yearEnd: number,
    name: string,
    events: HistoryEvent[]
}