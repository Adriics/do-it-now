import { Router } from "express";
import { ActionService } from "../service/ActionService";
import { ActionHelper } from "../helpers/ActionHelper";



export default function createAction(router: Router) {

    const service = new ActionService(new ActionHelper())

}