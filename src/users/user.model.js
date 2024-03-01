import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is a required field"],
    },
    email: {
        type: String,
        required: [true, "Email is a required field"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is a required field"],
    },
    role: {
        type: String,
        required: true,
        default: "ADMIN_ROLE"
    },
    state: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: true,
    },
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
  }
  
  export default mongoose.model('User', UserSchema);