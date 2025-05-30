const xlsx = require("xlsx");
const Income = require("../models/Income");

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
            userId,
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
    const userId = req.user.id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Delete Income        
exports.deleteIncome = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Download Income Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ user: userId }).sort({ date: -1 });
        // prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));
        // Create Excel file
        const ws = xlsx.utils.json_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");

        xlsx.writeFile(wb, 'Income_details.xlsx');
        res.download('Income_details.xlsx');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};