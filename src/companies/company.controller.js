import { response, request } from "express";
import Company from './company.model.js';

/// Ordenar por nombre de A  - Z
export const companyAZGet = async (req = request, res = response) => {
    const query = {state: true};

    try {
        const companiesAZ = await Company.find(query).sort({ companyName: 1 });
         res.status(200).json({
             total,
             companiesAZ
         })
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Ordering error companies" });
   
    }
}
// Ordenar por nombre de Z  - A

export const companyZAGet = async (req = request, res = response) => {
    const query = {state: true};

    try {
        const companiesAZ = await Company.find(query).sort({ companyName: -1 });
         res.status(200).json({
             total,
             companiesZA
         })
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Ordering error companies" });
   
    }
}

export const companyPost = async (req, res) => {
    const {companyName, description, impactLevel, category, trajectory} = req.body;

    const company = new Company({companyName, description, impactLevel, category, trajectory});

    await company.save();
    res.status(200).json({
        company
    });
}