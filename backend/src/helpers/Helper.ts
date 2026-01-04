import { EntitySchema, Repository } from "typeorm";
import db from "../dataSourceConnection"
import { Entity } from "../entities/Entity";


export abstract class Helper<T extends Entity> {

    protected async getDatabaseConnection() {
        return await db
    }

    abstract getEntitySchema(): EntitySchema

    async getRepository(): Promise<Repository<T>> {
        return (await this.getDatabaseConnection()).getRepository(this.getEntitySchema())
    }
}