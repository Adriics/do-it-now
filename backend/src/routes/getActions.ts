import { Router } from "express";
import { ActionService } from "../service/ActionService";
import { ActionHelper } from "../helpers/ActionHelper";
import { GetActionsController } from "../controllers/GetActionsController";



export default function getActions(router: Router) {

    const service = new ActionService(new ActionHelper())

    const controller = new GetActionsController(service)
    controller.run = controller.run.bind(controller)

    router.get("/v1/do-it-now/actions", controller.run)
}