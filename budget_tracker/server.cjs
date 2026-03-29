require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// expense schema
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ["food", "laundry", "transportation", "entertainment"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

// root route
app.get("/", (req, res) => {
  res.send("Dorm Dollars backend is running");
});

// GET all expenses
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// POST new expense
app.post("/expenses", async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;

    if (!description || !amount || !category) {
      return res.status(400).json({ error: "Description, amount, and category are required" });
    }

    const newExpense = new Expense({
      description,
      amount,
      category,
      date: date || new Date()
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// DELETE an expense
app.delete("/expenses/:id", async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// GET expense totals by category
app.get("/expenses/summary", async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    const result = {
      food: 0,
      laundry: 0,
      transportation: 0,
      entertainment: 0,
      total: 0
    };

    summary.forEach((item) => {
      result[item._id] = item.total;
      result.total += item.total;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get expense summary" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});