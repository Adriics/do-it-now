import { Request, Response } from "express";
import { ActionService } from "../service/ActionService";
import { InvalidFields } from "../errors/action/InvalidFields";
import { ActionNotFound } from "../errors/action/ActionNotFound";


export class PatchActionStatusController {

    constructor(private readonly service: ActionService) { }

    async run(req: Request, res: Response) {

        try {
            console.log("PATCH ACTION STATUS HIT", req.params)

            const { actionId } = req.params

            await this.service.patchActionStatus(actionId)

            return res.status(200).send()
        } catch (error) {

            if (error instanceof InvalidFields) return res.status(400).send()

            if (error instanceof ActionNotFound) return res.status(404).send()

            return res.status(500).send(error)
        }
    }
}