import { Router } from "express";
import { ActionService } from "../service/ActionService";
import { ActionHelper } from "../helpers/ActionHelper";
import { DeleteActionController } from "../controllers/DeleteActionController";



export default function deleteAction(router: Router) {

    const service = new ActionService(new ActionHelper())

    const controller = new DeleteActionController(service)
    controller.run = controller.run.bind(controller)

    router.delete("/v1/do-it-now/actions/:id", controller.run)
}