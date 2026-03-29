import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function StartPage({formData, setFormData, nextPage}) {

  const handleCashFlowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, cashFlow: value });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md px-8 space-y-8 flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-slate-900">Welcome to Budget-Buddy</h1>
          <p className="text-lg text-slate-600">Enter your cash flow details to get started</p>
        </div>
        
        <div className="space-y-6 w-full">

          {/* Frequency Selection */}
          <div className="space-y-3">
            <Label className="text-lg">Cash Flow Frequency</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={formData.cashFlowFrequency === "weekly" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, cashFlowFrequency: "weekly" })}
                className="h-12"
              >
                Weekly
              </Button>
              <Button
                type="button"
                variant={formData.cashFlowFrequency === "monthly" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, cashFlowFrequency: "monthly" })}
                className="h-12"
              >
                Monthly
              </Button>
            </div>
          </div>

          {/* Cash Flow Amount */}
          <div className="space-y-2">
            <Label htmlFor="cashflow" className="text-lg">
              Cash Flow Amount {formData.cashFlowFrequency ? `(${formData.cashFlowFrequency})` : ""}
            </Label>
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