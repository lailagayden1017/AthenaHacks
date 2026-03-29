import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function StartPage({formData, setFormData, nextPage}) {

  const handleCashFlowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numerical characters (0-9, optional decimal point)
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, cashFlow: value });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md px-8 space-y-8 flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-slate-900">Welcome</h1>
          <p className="text-lg text-slate-600">Enter your cash flow details to get started</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cashflow" className="text-lg">Cash Flow</Label>
            <Input
              id="cashflow"
              type="number"
              placeholder="Enter amount"
              value={formData.cashFlow}
              onChange={handleCashFlowChange}
              className="w-full h-12 text-lg"
            />
          </div>
          
          <Button 
            onClick={nextPage}
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}