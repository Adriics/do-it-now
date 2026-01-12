import { Entity } from "./Entity";

export class PushSubscription implements Entity {
    readonly id!: string

    constructor(
        readonly endpoint: string,
        readonly p256dh: string,
        readonly auth: string,
        readonly createdAt: Date) { }

    static create(endpoint: string, p256dh: string, auth: string): PushSubscription {
        return new PushSubscription(endpoint, p256dh, auth, new Date())
    }
}