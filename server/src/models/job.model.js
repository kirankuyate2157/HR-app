import mongoose from "mongoose";


function generateJobId() {
    return 'J' + Math.floor(100000 + Math.random() * 900000).toString();
}

const jobSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        JobId: {
            type: String,
            default: generateJobId,
            unique: true
        },
        JobBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        salary: {
            type: Number,
            required: false
        },
        jobType: {
            type: String,
            default: 'Full-time',
            enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
            required: true
        },
        postedDate: {
            type: Date,
            default: Date.now
        },
        applicationDeadline: {
            type: Date,
            required: false
        },
        skills: {
            type: [String],
            required: true
        },
        experienceLevel: {
            type: String,
            default: 'Entry',
            enum: ['Entry', 'Mid', 'Senior'],
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Closed'],
            default: 'Active'
        },
        applications: [{
            applicantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Applicant",
                required: true
            },
            appliedDate: {
                type: Date,
                default: Date.now
            }
        }]
    },
    { timestamps: true }
);

jobSchema.pre('save', function (next) {
    if (!this.JobId) {
        this.JobId = generateJobId();
    }
    next();
});

export const Job = mongoose.model("Job", jobSchema);
