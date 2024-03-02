import User from '../users/user.model.js'
import Company from '../companies/company.model.js'

export const existingEmail = async (email = '') => {
    const emailExists = await User.findOne({email});
    if (emailExists){
        throw new Error(`The email ${email}  is already registered.`);
    }
}

export const existingCompany = async (companyName = '') => {
    const companyExists = await Company.findOne({companyName});
    if (companyExists){
        throw new Error(`The company ${companyName} is already registered.`);
    }
}

export const existingIdCompany = async (id = '') => {
    const companyExists = await Company.findById(id);
    if (!companyExists){
        throw new Error('The company doesnt exists');
    }
}