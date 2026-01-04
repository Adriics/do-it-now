import dataSource from "../dataSourceConfig";
import { Action, StatusType } from "../entities/Action";
import { actionModel } from "../model/ActionModel";
import { ActionRepository } from "./ActionRepository";
import { In, LessThanOrEqual, Repository } from "typeorm";

export class TypeOrmActionRepository implements ActionRepository {

    private getRepository(): Repository<Action> {
        return dataSource.getRepository(actionModel)
    }

    async findPendingBefore(date: Date): Promise<Action[]> {
        return this.getRepository().find({
            where: {
                status: StatusType.Pending,
                executeAt: LessThanOrEqual(date)
            }
        })
    }

    async markAsReady(actionIds: string[]): Promise<void> {

        if (actionIds.length === 0) return

        await this.getRepository().update(
            {
                id: In(actionIds)
            },
            { status: StatusType.Ready })


    }

    // 👇 método extra solo para crear
    async save(action: Action): Promise<void> {
        this.getRepository().save(action)
    }

    // 👇 opcional para debug
    async getAll(): Promise<Action[]> {
        return this.getRepository().find()
    }

}