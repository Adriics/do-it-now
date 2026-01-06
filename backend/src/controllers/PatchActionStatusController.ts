import { Request, Response } from "express";
import { ActionService } from "../service/ActionService";


export class PatchActionStatusController {

    constructor(private readonly service: ActionService) { }

    async run(req: Request, res: Response) {

        try {
            const { actionId } = req.params

            await this.service.patchActionStatus(actionId)
        } catch (error) {

        }
    }
}