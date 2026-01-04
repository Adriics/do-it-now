import { Action } from "../entities/Action";


export interface ActionRepository {
    findPendingBefore(date: Date): Promise<Action[]>
    markAsReady(actionIds: string[]): Promise<void>
}