import { Request, Response } from "express";
import { ActionService } from "../service/ActionService";
import { InvalidFields } from "../errors/action/InvalidFields";
import { v4 } from "uuid"


export class CreateActionController {

    constructor(private readonly service: ActionService) { }

    async run(req: Request, res: Response) {

        try {

            const { type, receptor, message, executeAt } = req.body

            if (!type || !receptor || !executeAt || isNaN(new Date(executeAt).getTime())) {
                throw new InvalidFields("Faltan campos o fecha inválida")
            }

            await this.service.create(v4(), type, receptor, executeAt, message)

            return res.status(201).json({
                ok: true,
                message: "Action creada con exito!"
            })

        } catch (error) {

            if (error instanceof InvalidFields)
                return res.status(400).send(error.message)

            return res.status(500).send()

        }
    }

}