import mongoose from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verificationCode:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
});
adminSchema.methods.comparePassword = async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

const Admin = mongoose.model('Admin',adminSchema);

export default Admin;