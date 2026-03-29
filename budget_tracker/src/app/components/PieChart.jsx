import React from "react";

function PieChart({ food, laundry, transportation, entertainment, total, spending, savings, isSavingsView, fundsAvailable }) {
  // Handle savings view
  if (isSavingsView) {
    const totalAmount = spending + savings;
    //if (totalAmount === 0) return null;

    const radius = 100;
    const centerX = 120;
    const centerY = 120;

    const spendingAngle = (spending / totalAmount) * 360;
    const savingsAngle = (savings / totalAmount) * 360;

    function getCoords(angle) {
      const rad = (angle - 90) * Math.PI / 180;
      return {
        x: centerX + radius * Math.cos(rad),
        y: centerY + radius * Math.sin(rad)
      };
    }

    function createSlice(startAngle, endAngle, color) {
      const clampedEnd = endAngle - startAngle >= 360 ? startAngle + 359.99 : endAngle;
      const start = getCoords(startAngle);
      const end = getCoords(clampedEnd);
      const largeArc = clampedEnd - startAngle > 180 ? 1 : 0;
      const path = `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
      return <path d={path} fill={color} stroke="black" strokeWidth="1" />;
    }

    const spendingAngle1 = totalAmount > 0 ? (spending / totalAmount) * 360 : 0;

    return (
      <div className="flex flex-col items-center gap-6">
        <svg width="240" height="240">
          {/* Green base circle = 100% savings by default */}
          <circle cx={centerX} cy={centerY} r={radius} fill="#10b981" stroke="black" strokeWidth="1.5" />
          {/* Red spending slice draws on top */}
          {spending > 0 && createSlice(0, spendingAngle1, "#ef4444")}
        </svg>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ef4444" }}></div>
            <p className="text-sm">Spending: {totalAmount > 0 ? ((spending / totalAmount) * 100).toFixed(1) : "0.0"}%</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#10b981" }}></div>
            <p className="text-sm">Savings: {totalAmount > 0 ? ((savings / totalAmount) * 100).toFixed(1) : "100.0"}%</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle category view (original logic)
  //if (total === 0) return null;

  const radius = 100;
  const centerX = 120;
  const centerY = 120;

  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];
  const categories = [
    { name: "Food", value: food, color: "#ef4444" },
    { name: "Laundry", value: laundry, color: "#3b82f6" },
    { name: "Transportation", value: transportation, color: "#10b981" },
    { name: "Entertainment", value: entertainment, color: "#f59e0b" }
  ];
  
  if (total === 0) {
    return (
      <div className="flex flex-col items-center gap-6">
        <svg width="240" height="240">
          <circle cx={centerX} cy={centerY} r={radius} fill="gray" stroke="black" strokeWidth="1.5" />
        </svg>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }}></div>
              <p className="text-sm">{cat.name}: 0.0%</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  const angles = [
    (food / total) * 360,
    (laundry / total) * 360,
    (transportation / total) * 360,
    (entertainment / total) * 360
  ];

  

  function getCoords(angle) {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: centerX + radius * Math.cos(rad), y: centerY + radius * Math.sin(rad) };
  }

  function createSlice(startAngle, endAngle, color) {
    const clampedEnd = endAngle - startAngle >= 360 ? startAngle + 359.99 : endAngle;
    const start = getCoords(startAngle);
    const end = getCoords(clampedEnd);
    const largeArc = clampedEnd - startAngle > 180 ? 1 : 0;
    const path = `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
    return <path d={path} fill={color} stroke="black" strokeWidth="1" />;
  }

  const remaining = Math.max(fundsAvailable - total, 0);
  const totalAmount = fundsAvailable > 0 ? fundsAvailable : total;

  let currentAngle = 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width="240" height="240">
        <circle cx={centerX} cy={centerY} r={radius} fill="#d1d5db" stroke="black" strokeWidth="1.5" />
        {categories.map((cat, i) => {
          if (cat.value === 0) return null;
          const sliceAngle = (cat.value / totalAmount) * 360;
          const slice = createSlice(currentAngle, currentAngle + sliceAngle, colors[i]);
          currentAngle += sliceAngle;
          return <g key={i}>{slice}</g>;
        })}
      </svg>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }}></div>
            <p className="text-sm">{cat.name}: {((cat.value / totalAmount) * 100).toFixed(1)}%</p>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: "#d1d5db" }}></div>
          <p className="text-sm">Remaining: {((remaining / totalAmount) * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
