import db from "../dataSourceConnection"
import { Action, StatusType } from "../entities/Action"
import { actionModel } from "../model/ActionModel"
import { ActionRepository } from "./ActionRepository"
import { In, LessThanOrEqual, Repository } from "typeorm"

export class TypeOrmActionRepository implements ActionRepository {

  private async getRepository(): Promise<Repository<Action>> {
    return (await db).getRepository(actionModel)
  }

  async markAsDone(actionsIds: string[]): Promise<void> {
    if (actionsIds.length === 0) return Promise.resolve()
    await (await this.getRepository()).update(
      { id: In(actionsIds) },
      { status: StatusType.Done },
    )
  }

  async findPendingBefore(date: Date): Promise<Action[]> {
    return (await this.getRepository()).find({
      where: {
        status: StatusType.Pending,
        executeAt: LessThanOrEqual(date),
      },
    })
  }

  async markAsReady(actionIds: string[]): Promise<void> {
    if (actionIds.length === 0) return
    await (await this.getRepository()).update(
      { id: In(actionIds) },
      { status: StatusType.Ready },
    )
  }

  async save(action: Action): Promise<void> {
    await (await this.getRepository()).save(action)
  }

  async getAll(): Promise<Action[]> {
    return (await this.getRepository()).find()
  }
}