import { Router } from "express";
import createAction from "./createAction";
import getActions from "./getActions";
import getAction from "./getAction";



export function registerRoutes(): Router {

    const router = Router()

    createAction(router)
    getActions(router)
    getAction(router)

    return router
}