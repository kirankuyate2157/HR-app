import mongoose from "mongoose";

// Schema for education
const educationSchema = new mongoose.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    grade: { type: String },
    description: { type: String }
});

// Schema for experience
const experienceSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
});

// Schema for link
const linkSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., LinkedIn, GitHub
    url: { type: String, required: true }
});

// Main applicant schema
const applicantSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    summary: { type: String },
    skills: { type: [String], required: true },
    experience: [experienceSchema],
    education: [educationSchema],
    links: [linkSchema],
    resume: { type: String },
    coverLetter: { type: String },
    additionalInfo: { type: String },
}, { timestamps: true });


export const Applicant = mongoose.model("Applicant", applicantSchema);
