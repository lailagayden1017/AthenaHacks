import { useState } from "react";

export default function AddNumbers() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [total, setTotal] = useState(0);

  const handleSubmit = () => {
    const sum =
      Number(num1 || 0) +
      Number(num2 || 0) +
      Number(num3 || 0);

    setTotal(sum);
  };

  return (
    <div>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Number 1"
      />
      <br /><br />

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Number 2"
      />
      <br /><br />

      <input
        type="number"
        value={num3}
        onChange={(e) => setNum3(e.target.value)}
        placeholder="Number 3"
      />
      <br /><br />

      <button onClick={handleSubmit}>Submit</button>

      <p>Total: {total}</p>
    </div>
  );
}