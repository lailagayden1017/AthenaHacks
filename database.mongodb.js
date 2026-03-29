use('RamenToRiches');

// Insert a few documents into the sales collection.
db.getCollection('Expenses').insertMany([
    { description: "Groceries", amount: 50, category: "food", date: new Date() },
    { description: "Laundry", amount: 15, category: "laundry", date: new Date() },
    { description: "Uber ride", amount: 25, category: "transportation", date: new Date() },
    { description: "Movie night", amount: 20, category: "entertainment", date: new Date() }
  ]);
  
  // View all expenses
  db.getCollection('expenses').find({});
  
  // Total spending
  db.getCollection('expenses').aggregate([
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);
  
  // Spending by category (for pie chart)
  db.getCollection('expenses').aggregate([
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);