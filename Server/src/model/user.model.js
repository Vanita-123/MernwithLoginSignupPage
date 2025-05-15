import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmpassword: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true, 
      minlength: 10,
      maxlength: 10,
    },
  },
  { 
    timestamp: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
  