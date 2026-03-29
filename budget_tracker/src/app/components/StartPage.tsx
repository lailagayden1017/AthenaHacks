import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Wallet } from "lucide-react";

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
        {/* <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-slate-900">Welcome to Budget-Buddy</h1>
          <p className="text-lg text-slate-600">Enter your cash flow details to get started</p>
        </div> */}
        {/* --- MODERN BRANDING HEADER --- */}
<div className="text-center mb-10 space-y-4">
  {/* Animated Icon Badge */}
  {/* <div className="mx-auto w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 rotate-3 shadow-lg shadow-emerald-200 transition-transform hover:rotate-0 duration-300">
    <Wallet className="w-8 h-8 text-white" />
  </div> */}
  {/* --- STATIC ICON BADGE --- */}
<div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
  <Wallet className="w-8 h-8 text-primary-foreground" />
</div>

  <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none">
  <span className="text-primary">
    Budget-Buddy
  </span>
</h1>
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