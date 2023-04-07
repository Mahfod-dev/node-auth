const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide a company name'],
        trim: true,
    },
    position: {
        type: String,
        required: [true, 'Please provide a position'],
        trim: true,
    },
    status: {
        type: String,
        required: [true, 'Please provide a status'],
        enum: ['applied', 'interview', 'offer', 'rejected'],
        default: 'applied',
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user'],
    }
  
},
{
    timestamps: true,
}
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;