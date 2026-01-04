import { Router } from "express";
import { ActionService } from "../service/ActionService";
import { ActionHelper } from "../helpers/ActionHelper";
import { GetActionController } from "../controllers/GetActionController";


export default function getAction(router: Router) {

    const service = new ActionService(new ActionHelper())

    const controller = new GetActionController(service)
    controller.run = controller.run.bind(controller)

    router.get("/v1/do-it-now/actions/:id", controller.run)
}