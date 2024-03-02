import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auth.controller.js";
import { validateParams } from "../middlewares/validate-campos.js";

const router = Router();

router.post(
   '/login',
   [
        check('email', 'Invalid email').isEmail(),
        check('password', '').not().isEmpty(),
        validateParams,
   ], login)

export default router;