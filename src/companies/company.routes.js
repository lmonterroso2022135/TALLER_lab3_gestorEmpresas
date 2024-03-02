import { Router } from "express";
import { check } from "express-validator";

import { validateJWT } from "../middlewares/validate-jwt.js";
import { isAdminRole } from "../middlewares/validate-role.js";
import { existingCompany, existingIdCompany } from "../helpers/db-validators.js"

import {
    companyZAGet,
    companyAZGet,
    companyPost,
    companyPut,
    companiesExcelReport,
    companyTrajectoryGet
} from "./company.controller.js"
import { validateParams } from "../middlewares/validate-campos.js";


const router = Router();

router.get("/A-Z", validateJWT, isAdminRole, companyAZGet);

router.get("/Z-A", validateJWT, isAdminRole, companyZAGet);

router.get("/forTrajectory", validateJWT, isAdminRole, companyTrajectoryGet);

router.get("/", validateJWT, isAdminRole, companiesExcelReport);

router.post(
    "/",
    [
        validateJWT, 
        isAdminRole,
        check("companyName", "").not().isEmpty(),
        check("companyName").custom(existingCompany),
        check("description", "").not().isEmpty(),
        check("impactLevel", "").not().isEmpty(),
        check("category", "").not().isEmpty(),
        check("trajectory", "").not().isEmpty(),
        validateParams
    ], companyPost);

router.put(
    "/:id",
    [
        validateJWT, 
        isAdminRole,
        check("id", "Is an invalid ID").isMongoId(),
        check("id").custom(existingIdCompany),
    ], companyPut);

export default router;