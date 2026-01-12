import { Router } from "express";
import { CreatePushSubscriptionController } from "../controllers/CreatePushSubscriptionController";
import { PushSubscriptionService } from "../service/PushSubscriptionService";
import { PushSubscriptionHelper } from "../helpers/PushSubscriptionHelper";



export default function createPushSubscription(router: Router) {

    const service = new PushSubscriptionService(new PushSubscriptionHelper())
    const controller = new CreatePushSubscriptionController(service)
    controller.run = controller.run.bind(controller)

    router.post("/v1/push/subscribe", controller.run)
}