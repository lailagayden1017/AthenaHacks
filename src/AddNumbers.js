import React, { useState } from "react";

function AddNumbers() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [total, setTotal] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const sum = Number(num1 || 0) + Number(num2 || 0) + Number(num3 || 0);
    setTotal(sum);
  }

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
      />

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
      />

      <input
        type="number"
        value={num3}
        onChange={(e) => setNum3(e.target.value)}
        placeholder="Enter third number"
      />

      <button type="submit">Submit</button>

      {total !== null && <p className="result">Total: {total}</p>}
    </form>
  );
}

export default AddNumbers;