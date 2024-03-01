import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auth.controller.js";

const router = Router();

router.post(
   '/login',
   [
        check('email', 'Invalid email').isEmail(),
        check('password', '').not().isEmpty()
   ], login)

export default router;