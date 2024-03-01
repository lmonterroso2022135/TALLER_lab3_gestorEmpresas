import { Router } from "express";
import { check } from "express-validator";
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
    ], userPost);

export default router;