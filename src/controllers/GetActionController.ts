import { Request, Response } from "express";
import { InvalidFields } from "../errors/action/InvalidFields";
import { ActionService } from "../service/ActionService";


export class GetActionController {

    constructor(private readonly service: ActionService) { }

    async run(req: Request, res: Response) {

        try {

            const id = req.params.id

            if (!id) {
                throw new InvalidFields("Faltan campos, rellena todos")
            }

            const action = await this.service.getById(id)

            return res.status(200).json({
                ok: true,
                message: "Accion obtenida con exito!",
                data: action
            })

        } catch (error) {

            if (error instanceof InvalidFields) return res.status(404).send(error.message)

            return res.status(500).send()

        }
    }
}