import { Request, Response } from "express";
import { ActionService } from "../service/ActionService";
import { InvalidFields } from "../errors/action/InvalidFields";



export class GetActionsController {

    constructor(private readonly service: ActionService) { }

    async run(req: Request, res: Response) {

        try {

            const actions = await this.service.getAll()

            return res.status(200).json({
                ok: true,
                message: "Acciones obtenidas con exito!",
                data: actions
            })
        } catch (error) {

            if (error instanceof InvalidFields) return res.status(404).send(error.message)

            return res.status(500).send()

        }
    }
}