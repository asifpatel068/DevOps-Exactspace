const mongoose=require("mongoose")

const dataSchema = mongoose.Schema({
    data: String,
    timestamp: { type: Date, default: Date.now },
});

const DataModel = mongoose.model('data', dataSchema);
module.exports={DataModel}