import { Router } from "express";
import createAction from "./createAction";
import getActions from "./getActions";



export function registerRoutes(): Router {

    const router = Router()

    createAction(router)
    getActions(router)

    return router
}