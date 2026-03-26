import { Router } from "express";
import createAction from "./createAction";
import getActions from "./getActions";
import getAction from "./getAction";
import deleteAction from "./deleteAction";
import patchActionStatus from "./patchActionStatus";
import createPushSubscription from "./createPushSubscription";



export function registerRoutes(): Router {

    const router = Router()

    createAction(router)
    getActions(router)
    getAction(router)
    deleteAction(router)
    patchActionStatus(router)
    deleteAction(router)
    createPushSubscription(router)

    return router
}