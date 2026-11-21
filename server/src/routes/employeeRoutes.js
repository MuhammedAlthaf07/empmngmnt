import { Router } from "express";
import { body, param } from "express-validator";
import Employee from "../models/Employee.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();
router.use(protect);

const employeeRules = [
  body("name").trim().isLength({ min: 2, max: 80 }).withMessage("Name must be between 2 and 80 characters"),
  body("email").trim().isEmail().normalizeEmail().withMessage("Enter a valid email"),
  body("phone").trim().matches(/^[0-9+\-()\s]{7,20}$/).withMessage("Enter a valid phone number"),
  body("department").isIn(["Engineering", "Human Resources", "Finance", "Marketing", "Sales", "Operations"]).withMessage("Select a valid department"),
  body("position").trim().isLength({ min: 2, max: 80 }).withMessage("Position must be between 2 and 80 characters"),
  body("salary").isFloat({ min: 0 }).withMessage("Salary must be zero or greater"),
  body("status").optional().isIn(["Active", "On Leave", "Inactive"]).withMessage("Select a valid status")
];

router.get("/", async (_req, res, next) => {
  try { res.json(await Employee.find().sort({ createdAt: -1 })); }
  catch (error) { next(error); }
});

router.post("/", employeeRules, validate, async (req, res, next) => {
  try { res.status(201).json(await Employee.create(req.body)); }
  catch (error) { next(error); }
});

router.put("/:id", [param("id").isMongoId().withMessage("Invalid employee ID"), ...employeeRules], validate, async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) { next(error); }
});

router.delete("/:id", param("id").isMongoId().withMessage("Invalid employee ID"), validate, async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) { next(error); }
});

export default router;
