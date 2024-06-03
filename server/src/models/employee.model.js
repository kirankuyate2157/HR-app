import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    fromDate: { type: Date, default: Date.now(), required: true },
    toDate: { type: Date },
    benefits: { type: [String] },
    reviews: { type: [String] },
    experience: { type: String },
    recommendations: { type: [String] },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant', required: true },
    selectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID of the employee who selected
}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema)
