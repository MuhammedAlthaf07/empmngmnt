import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  department: {
    type: String,
    required: true,
    enum: ["Engineering", "Human Resources", "Finance", "Marketing", "Sales", "Operations"]
  },
  position: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  salary: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["Active", "On Leave", "Inactive"], default: "Active" }
}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
