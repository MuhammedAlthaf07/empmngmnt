import "dotenv/config";
import mongoose from "mongoose";
import Employee from "../src/models/Employee.js";

const employees = [
  { name: "Aisha Rahman", email: "aisha.rahman@company.com", phone: "+1 555 014 2101", department: "Engineering", position: "Frontend Engineer", salary: 82000, status: "Active" },
  { name: "Daniel Kim", email: "daniel.kim@company.com", phone: "+1 555 014 2102", department: "Engineering", position: "Backend Engineer", salary: 88000, status: "Active" },
  { name: "Sophia Patel", email: "sophia.patel@company.com", phone: "+1 555 014 2103", department: "Human Resources", position: "HR Manager", salary: 76000, status: "Active" },
  { name: "Marcus Johnson", email: "marcus.johnson@company.com", phone: "+1 555 014 2104", department: "Finance", position: "Financial Analyst", salary: 69000, status: "On Leave" },
  { name: "Emma Wilson", email: "emma.wilson@company.com", phone: "+1 555 014 2105", department: "Marketing", position: "Marketing Lead", salary: 73000, status: "Active" },
  { name: "Noah Garcia", email: "noah.garcia@company.com", phone: "+1 555 014 2106", department: "Sales", position: "Account Executive", salary: 71000, status: "Inactive" },
  { name: "Olivia Chen", email: "olivia.chen@company.com", phone: "+1 555 014 2107", department: "Engineering", position: "DevOps Engineer", salary: 91000, status: "Active" },
  { name: "Liam Thompson", email: "liam.thompson@company.com", phone: "+1 555 014 2108", department: "Engineering", position: "QA Engineer", salary: 68000, status: "Active" },
  { name: "Mia Anderson", email: "mia.anderson@company.com", phone: "+1 555 014 2109", department: "Human Resources", position: "Recruitment Specialist", salary: 62000, status: "Active" },
  { name: "Ethan Martinez", email: "ethan.martinez@company.com", phone: "+1 555 014 2110", department: "Finance", position: "Accountant", salary: 66000, status: "Active" },
  { name: "Charlotte Brown", email: "charlotte.brown@company.com", phone: "+1 555 014 2111", department: "Marketing", position: "Content Strategist", salary: 64000, status: "On Leave" },
  { name: "James Davis", email: "james.davis@company.com", phone: "+1 555 014 2112", department: "Sales", position: "Sales Manager", salary: 79000, status: "Active" },
  { name: "Amelia Taylor", email: "amelia.taylor@company.com", phone: "+1 555 014 2113", department: "Operations", position: "Operations Coordinator", salary: 60000, status: "Active" },
  { name: "Benjamin Lee", email: "benjamin.lee@company.com", phone: "+1 555 014 2114", department: "Operations", position: "Project Manager", salary: 85000, status: "Active" },
  { name: "Isabella Moore", email: "isabella.moore@company.com", phone: "+1 555 014 2115", department: "Engineering", position: "UI/UX Designer", salary: 72000, status: "Active" },
  { name: "Lucas White", email: "lucas.white@company.com", phone: "+1 555 014 2116", department: "Finance", position: "Payroll Specialist", salary: 58000, status: "Inactive" }
];

await mongoose.connect(process.env.MONGODB_URI);

for (const employee of employees) {
  await Employee.updateOne(
    { email: employee.email },
    { $set: employee },
    { upsert: true }
  );
}

console.log(`Seeded ${employees.length} employees.`);
await mongoose.disconnect();
