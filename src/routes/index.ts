import { Router } from "express";
import createAction from "./createAction";



export function registerRoutes(): Router {

    const router = Router()

    createAction(router)

    return router
}