import { response, request } from "express";
import xl from "excel4node";
import path from "path";
import Company from './company.model.js';


// Registrar empresa
export const companyPost = async (req, res) => {
    const {companyName, description, impactLevel, category, trajectory} = req.body;

    const company = new Company({companyName, description, impactLevel, category, trajectory});

    await company.save();
    res.status(200).json({
        company
    });
}

// Editar atos de empresa
export const companyPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, ...resto} = req.body;

    await Company.findByIdAndUpdate(id, resto);

    const company = await Company.findOne({_id: id});

    res.status(200).json({
        msg: 'Company actualized'
    });
}



/// Ordenar por nombre de A  - Z
export const companyAZGet = async (req = request, res = response) => {
    const query = {state: true};

    try {
        const companiesAZ = await Company.find(query).sort({ companyName: 1 });
        const total = await Company.countDocuments(query); 

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
        const companiesZA = await Company.find(query).sort({ companyName: -1 });
        const total = await Company.countDocuments(query); 
        
        res.status(200).json({
             total,
             companiesZA
         })
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Ordering error companies" });
   
    }
}
// Ordenar por cantidad de años de trayectoria
export const companyTrajectoryGet = async (req = request, res = response) => {
    const query = {state: true};

    try {
        const companiesZA = await Company.find(query).sort({ trajectory: -1 });
        const total = await Company.countDocuments(query); 
        
        res.status(200).json({
             total,
             companiesZA
         })
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({ message: "Ordering error companies" });
   
    }
}
// Generar reporte en excel 
export const companiesExcelReport = async (req, res) => {
    const query = {state: true};
    // Libro
    var wb = new xl.Workbook();
    // Hoja
    const ws = wb.addWorksheet('Interfer companies');
    // Estilo de encabezados
    const headers = wb.createStyle({
        font: {
            bold: true
        },
        fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#FF9999'   
        }
    })
    const comp = wb.createStyle({
        font: {
            bold: true
        },
    })

    ws.cell(1,1).string("Company").style(headers);
    ws.cell(1,2).string("Description").style(headers);
    ws.cell(1,3).string("Impact level").style(headers);
    ws.cell(1,4).string("Category").style(headers);
    ws.cell(1,5).string("Trajectory").style(headers);

    ws.column(1).setWidth(20);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(15);
    ws.column(5).setWidth(12);

    const companies = await Company.find(query);
    let rowIndex = 2;

    companies.forEach(company => {
        ws.cell(rowIndex, 1).string(company.companyName).style(comp);
        ws.cell(rowIndex, 2).string(company.description);
        ws.cell(rowIndex, 3).string(company.impactLevel);
        ws.cell(rowIndex, 4).string(company.category);
        ws.cell(rowIndex, 5).number(company.trajectory);
        rowIndex++;
    });


    const excelPath = path.join('excelReports', 'InterferReport.xlsx');
    
    console.log("-> Interfer excel report generated");
    

    wb.write(excelPath, function(err, stats) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error generating excel report" });
        } else {
            // Descarga del archivo Excel
            res.download(excelPath, 'InterferReport.xlsx', function(err) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: "Error downloading excel report" });
                }
            });
        }
    });
}
