import React, { useState } from "react";
import PieChart from "./components/PieChart";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Wallet } from "lucide-react";

export default function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate totals by category
  const totals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    { food: 0, laundry: 0, transportation: 0, entertainment: 0 }
  );

  const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl">Budget Tracker</h1>
            <p className="text-muted-foreground">Track your expenses by category</p>
          </div>
        </div>

        {/* Total Budget Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl">${grandTotal.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ExpenseForm onAddExpense={handleAddExpense} />
            
            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(totals).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="capitalize">{category}</span>
                      <span className="font-semibold">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pie Chart */}
            {grandTotal > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Spending Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <PieChart
                    food={totals.food}
                    laundry={totals.laundry}
                    transportation={totals.transportation}
                    entertainment={totals.entertainment}
                    total={grandTotal}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Spending Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-12">
                    Add expenses to see your spending distribution
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Expense List */}
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}
