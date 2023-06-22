import mongoose from 'mongoose'

const proposalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    timeline:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.models.Proposal || mongoose.model('Proposal', proposalSchema)