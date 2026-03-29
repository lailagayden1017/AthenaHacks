import React from 'react';

function FormPage2({ formData, setFormData, prevPage }) {
  return (
    <div>
      <h2>Form Page 2</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email || ''}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
      />
      <button onClick={prevPage}>Back</button>
      <button type="submit">Submit</button>
    </div>
  );
}

export default FormPage2;
