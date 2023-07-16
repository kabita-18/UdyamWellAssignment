import mongoose from "mongoose";
const { Schema } = mongoose;

const resetPasswordSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);
export default ResetPassword;