// import React, { useState, useEffect } from "react";
// import PieChart from "./components/PieChart.jsx";
// import { ExpenseForm } from "./components/ExpenseForm.jsx";
// import { ExpenseList } from "./components/ExpenseList.jsx";
// import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
// import { Wallet, ChevronRight, ChevronLeft } from "lucide-react";
// import { ChatbotContainer } from '../components/Chatbot/src/ChatbotContainer';
// import { useLocation } from "react-router-dom";

// interface Expense {
//   id: string;
//   category: string;
//   amount: number;
//   description?: string;
// }

// export default function App() {
//   const location = useLocation();
//   const formData = location.state?.formData;

//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [showSavingsView, setShowSavingsView] = useState(false);
//   const [isEditingFunds, setIsEditingFunds] = useState(false);

//   const [fundsAvailable, setFundsAvailable] = useState(
//     formData?.cashFlow ? parseFloat(formData.cashFlow) : 0
//   );
//   const [savingsAmount, setSavingsAmount] = useState(
//     formData?.saveAmount ? parseFloat(formData.saveAmount) : 0
//   );
//   const [editFounds, setEditFunds] = useState(fundsAvailable);
//   const [editSavings, setEditSavings] = useState(savingsAmount);

//   const handleAddExpense = (expense: Expense) => {
//     setExpenses([expense, ...expenses]);
//   };

//   const handleDeleteExpense = (id: string) => {
//     setExpenses(expenses.filter(expense => expense.id !== id));
//   };

//   const totals = expenses.reduce(
//     (acc, expense) => {
//       acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
//       return acc;
//     },
//     { food: 0, laundry: 0, transportation: 0, entertainment: 0 }
//   );

//   const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-6xl mx-auto p-6 space-y-6">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
//               <Wallet className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-3xl">Budget Tracker</h1>
//               <p className="text-muted-foreground">Track your expenses by category</p>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <Card className="w-48">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium">Funds Available</CardTitle>
//               </CardHeader>
//               <CardContent className="px-3 pb-1">
//                 {isEditingFunds ? (
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">$</span>
//                     <input
//                       type="number"
//                       value={editFounds}
//                       onChange={(e) => setEditFunds(parseFloat(e.target.value) || 0)}
//                       className="w-full px-2 py-1 border rounded text-lg font-semibold"
//                     />
//                   </div>
//                 ) : (
//                   <p className="text-2xl font-bold">${fundsAvailable.toFixed(2)}</p>
//                 )}
//                 <button
//                   onClick={() => {
//                     if (isEditingFunds) {
//                       setFundsAvailable(editFounds);
//                       setEditFunds(editFounds);
//                     }
//                     setIsEditingFunds(!isEditingFunds);
//                   }}
//                   className="text-xs mt-2 text-primary hover:underline"
//                 >
//                   {isEditingFunds ? "Save" : "Edit"}
//                 </button>
//               </CardContent>
//             </Card>

//             <Card className="w-48">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {isEditingFunds ? (
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">$</span>
//                     <input
//                       type="number"
//                       value={editSavings}
//                       onChange={(e) => setEditSavings(parseFloat(e.target.value) || 0)}
//                       className="w-full px-2 py-1 border rounded text-lg font-semibold"
//                     />
//                   </div>
//                 ) : (
//                   <p className="text-2xl font-bold text-green-600">${savingsAmount.toFixed(2)}</p>
//                 )}
//                 <button
//                   onClick={() => {
//                     if (isEditingFunds) {
//                       setSavingsAmount(editSavings);
//                       setEditSavings(editSavings);
//                     }
//                     setIsEditingFunds(!isEditingFunds);
//                   }}
//                   className="text-xs mt-2 text-primary hover:underline"
//                 >
//                   {isEditingFunds ? "Save" : "Edit"}
//                 </button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Total Spending Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Spending</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-4xl">${grandTotal.toFixed(2)}</p>
//           </CardContent>
//         </Card>

//         {/* Main Grid */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           <div className="space-y-6">
//             <ExpenseForm onAddExpense={handleAddExpense} />
//             <Card>
//               <CardHeader>
//                 <CardTitle>Category Breakdown</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {Object.entries(totals).map(([category, amount]) => (
//                     <div key={category} className="flex justify-between items-center">
//                       <span className="capitalize">{category}</span>
//                       <span className="font-semibold">${amount.toFixed(2)}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="space-y-6">
//             <Card className="relative overflow-hidden">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div>
//                   <CardTitle>
//                     {showSavingsView ? "Spending vs Savings" : "Spending Distribution"}
//                   </CardTitle>
//                   {!showSavingsView && (
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Available Funds: <span className="text-primary font-semibold">${(fundsAvailable - grandTotal).toFixed(2)}</span>
//                     </p>
//                   )}
//                 </div>
//                 <button
//                   onClick={() => setShowSavingsView(!showSavingsView)}
//                   className="p-2 hover:bg-accent rounded-full transition-colors"
//                 >
//                   {showSavingsView ? <ChevronLeft /> : <ChevronRight />}
//                 </button>
//               </CardHeader>
//               <CardContent className="flex flex-col items-center gap-6">
//                 <div className="flex justify-center min-h-[300px] items-center">
//                   {showSavingsView ? (
//                     <PieChart
//                       spending={grandTotal}
//                       savings={Math.max(savingsAmount - grandTotal, 0)}
//                       isSavingsView={true}
//                     />
//                   ) : (
//                     <PieChart
//                       food={totals.food}
//                       laundry={totals.laundry}
//                       transportation={totals.transportation}
//                       entertainment={totals.entertainment}
//                       total={grandTotal}
//                       fundsAvailable={fundsAvailable}
//                     />
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />

//             <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
//               <ChatbotContainer />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }