import { Router } from "express";
import { check } from "express-validator";

import { existingEmail } from "../helpers/db-validators.js";
import { validateParams } from "../middlewares/validate-campos.js";

import {
    userGet,
    userPost
} from "./user.controller.js"


const router = Router();

router.get("/", userGet);

router.post(
    "/",
    [
        check("name", "").not().isEmpty(),
        check("password", "").isLength({min: 6,}),
        check("email", "").isEmail(),
        check("email").custom(existingEmail),
        validateParams,
    ], userPost);

export default router;