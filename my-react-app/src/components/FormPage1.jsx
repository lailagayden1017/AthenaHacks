import React from 'react';

function FormPage1({ formData, setFormData, nextPage }) {
  return (
    <div>
      <h2>Form Page 1</h2>
      <input
        type="text"
        placeholder="Name"
        value={formData.name || ''}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="button" onClick={nextPage}>Next</button>
    </div>
  );
}

export default FormPage1;
