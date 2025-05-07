const User = require("../models/User");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

// Add Income
exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

        // Validate input
        if (!amount || !source || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create new income record
        const newIncome = new Income({
            user: userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });
        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Income   
exports.getAllIncome = async (req, res) => {
};
// Delete Income        
exports.deleteIncome = async (req, res) => {
};
// Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
};