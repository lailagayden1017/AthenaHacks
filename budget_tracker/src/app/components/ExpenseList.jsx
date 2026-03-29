import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export function ExpenseList({ expenses, onDeleteExpense }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categoryColors = {
    food: "bg-red-500",
    laundry: "bg-blue-500",
    transportation: "bg-green-500",
    entertainment: "bg-orange-500"
  };

  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No expenses yet. Add your first expense to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-2 h-2 rounded-full ${categoryColors[expense.category]}`}></div>
                <div className="flex-1">
                  <p>{expense.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {expense.category} • {formatDate(expense.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold">${expense.amount.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
