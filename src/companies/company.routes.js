import { Router } from "express";
import { check } from "express-validator";
import {
    companyZAGet,
    companyAZGet,
    companyPost,
    companiesExcelReport,
    companyTrajectoryGet
} from "./company.controller.js"

const router = Router();

router.get("/", companiesExcelReport);


router.post(
    "/",
    [
        check("companyName", "").not().isEmpty(),
        check("description", "").not().isEmpty(),
        check("impactLevel", "").not().isEmpty(),
        check("category", "").not().isEmpty(),
        check("trajectory", "").not().isEmpty(),
    ], companyPost);

export default router;