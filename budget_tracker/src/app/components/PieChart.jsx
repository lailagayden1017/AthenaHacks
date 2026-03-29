import React from "react";

function PieChart({ food, laundry, transportation, entertainment, total, spending, savings, isSavingsView }) {
  // Handle savings view
  if (isSavingsView) {
    const totalAmount = spending + savings;
    if (totalAmount === 0) return null;

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
      const start = getCoords(startAngle);
      const end = getCoords(endAngle);
      const largeArc = endAngle - startAngle > 180 ? 1 : 0;

      const path = `
        M ${centerX} ${centerY}
        L ${start.x} ${start.y}
        A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}
        Z
      `;

      return <path d={path} fill={color} />;
    }

    return (
      <div className="flex flex-col items-center gap-6">
        <svg width="240" height="240">
          {createSlice(0, spendingAngle, "#ef4444")}
          {createSlice(spendingAngle, 360, "#10b981")}
        </svg>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#ef4444" }}></div>
            <p className="text-sm">
              Spending: {((spending / totalAmount) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#10b981" }}></div>
            <p className="text-sm">
              Savings: {((savings / totalAmount) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle category view (original logic)
  if (total === 0) return null;

  const radius = 100;
  const centerX = 120;
  const centerY = 120;

  const angles = [
    (food / total) * 360,
    (laundry / total) * 360,
    (transportation / total) * 360,
    (entertainment / total) * 360
  ];

  const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b"];
  const categories = [
    { name: "Food", value: food, color: "#ef4444" },
    { name: "Laundry", value: laundry, color: "#3b82f6" },
    { name: "Transportation", value: transportation, color: "#10b981" },
    { name: "Entertainment", value: entertainment, color: "#f59e0b" }
  ];

  function getCoords(angle) {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad)
    };
  }

  function createSlice(startAngle, endAngle, color) {
    const start = getCoords(startAngle);
    const end = getCoords(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    const path = `
      M ${centerX} ${centerY}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}
      Z
    `;

    return <path d={path} fill={color} />;
  }

  let currentAngle = 0;

  return (
    <div className="flex flex-col items-center gap-6">
      <svg width="240" height="240">
        {angles.map((angle, i) => {
          const slice = createSlice(currentAngle, currentAngle + angle, colors[i]);
          currentAngle += angle;
          return <g key={i}>{slice}</g>;
        })}
      </svg>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: cat.color }}></div>
            <p className="text-sm">
              {cat.name}: {((cat.value / total) * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
