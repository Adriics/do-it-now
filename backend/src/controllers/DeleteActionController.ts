import { Request, Response } from "express";
import { ActionService } from "../service/ActionService";
import { InvalidFields } from "../errors/action/InvalidFields";
import { ActionNotFound } from "../errors/action/ActionNotFound";


export class DeleteActionController {

    constructor(private readonly service: ActionService) { }

    async run(req: Request, res: Response) {

        try {

            const id = req.params.id

            await this.service.deleteAction(id)

            return res.status(204).send()

        } catch (error) {

            if (error instanceof InvalidFields) return res.status(404).send(error.message)
            if (error instanceof ActionNotFound) return res.status(404).send(error.message)

            return res.status(500).send()

        }
    }

}