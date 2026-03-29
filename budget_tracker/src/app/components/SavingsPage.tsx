import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default function SavingsPage({formData, setFormData, prevPage}) {
  const handleSaveAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numerical characters (0-9, optional decimal point)
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData({ ...formData, saveAmount: value });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md px-8 space-y-8 flex flex-col justify-center items-center">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-slate-900">Savings Goal</h1>
          <p className="text-lg text-slate-600">Set up your savings preferences</p>
        </div>
        
        <div className="space-y-6">
          {/* Frequency Selection */}
          <div className="space-y-3">
            <Label className="text-lg">Savings Frequency</Label>
            <div className="grid grid-cols-3 gap-3">
              <Button
                type="button"
                variant={formData.frequency === "weekly" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, frequency: "weekly" })}
                className="h-12"
              >
                Weekly
              </Button>
              <Button
                type="button"
                variant={formData.frequency === "monthly" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, frequency: "monthly" })}
                className="h-12"
              >
                Monthly
              </Button>
              <Button
                type="button"
                variant={formData.frequency === "semesterly" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, frequency: "semesterly" })}
                className="h-12"
              >
                Semesterly
              </Button>
            </div>
          </div>

          {/* Save Type Selection */}
          <div className="space-y-3">
            <Label className="text-lg">Save By</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={formData.saveType === "dollars" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, saveType: "dollars" })}
                className="h-12"
              >
                Dollars ($)
              </Button>
              <Button
                type="button"
                variant={formData.saveType === "percentage" ? "default" : "outline"}
                onClick={() => setFormData({ ...formData, saveType: "percentage" })}
                className="h-12"
              >
                Percentage (%)
              </Button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="saveAmount" className="text-lg">
              Amount to Save {formData.saveType === "percentage" ? "(%)" : "($)"}
            </Label>
            <Input
              id="saveAmount"
              type="text"
              placeholder={formData.saveType === "percentage" ? "Enter percentage" : "Enter amount"}
              value={formData.saveAmount}
              onChange={handleSaveAmountChange}
              className="w-full h-12 text-lg"
            />
          </div>
          
          <Button 
            onClick={prevPage}
            className="w-full"
            size="lg"
          >
            Back
          </Button>

          <Button 
            type="submit"
            className="w-full"
            size="lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
