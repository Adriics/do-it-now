import { Router } from "express";
import { ActionService } from "../service/ActionService";
import { ActionHelper } from "../helpers/ActionHelper";
import { CreateActionController } from "../controllers/CreateActionController";



export default function createAction(router: Router) {

    const service = new ActionService(new ActionHelper())

    const controller = new CreateActionController(service)
    controller.run = controller.run.bind(controller)

    router.post("/v1/do-it-now/actions", controller.run)

}