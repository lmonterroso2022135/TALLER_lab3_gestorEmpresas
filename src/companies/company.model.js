import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Company name is a required field"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is a required field"],
    },
    impactLevel: {
        type: String,
        required: [true, "Describe the level of impact of the company"],
    },
    category: {
        type: String,
        required: [true, "Category is a required field"],
    },
    trajectory: {
        type: Number,
        required: [true, "Trajectory years is a required field"]
    },
    state: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, _id, ...company} = this.toObject();
    company.uid = _id;
    return company;
}

export default mongoose.model('Company', UserSchema);