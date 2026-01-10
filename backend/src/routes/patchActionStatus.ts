import { Router } from "express";
import { ActionService } from "../service/ActionService";
import { ActionHelper } from "../helpers/ActionHelper";
import { PatchActionStatusController } from "../controllers/PatchActionStatusController";



export default function patchActionStatus(router: Router) {

    const service = new ActionService(new ActionHelper())

    const controller = new PatchActionStatusController(service)

    controller.run = controller.run.bind(controller)


    router.patch("/v1/actions/:id/done", controller.run)

}