const mongoose = require("mongoose");

const InformationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Information', InformationSchema);
