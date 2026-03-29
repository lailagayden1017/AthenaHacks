function Expenses({ formData, setFormData, prevPage }) {
  return (
    <div>
      <h2>Expenses</h2>
      <label>Laundry</label>
      <input
        type="text"
        placeholder=""
        value={formData.laundry || ''}
        onChange={e => setFormData({ ...formData, laundry: e.target.value })}
      />
      <br />

      <label>Entertainment</label>
      <input
        type="text"
        placeholder=""
        value={formData.entertainment || ''}
        onChange={e => setFormData({ ...formData, entertainment: e.target.value })}
      />
      <br />

      <label>Transportation</label>
      <input
        type="text"
        placeholder=""
        value={formData.transportation || ''}
        onChange={e => setFormData({ ...formData, transportation: e.target.value })}
      />
      <br />
      <br />
      <button type="button" onClick={prevPage}>Back</button>
      <button type="submit">Submit</button>
    </div>
  );
}

export default Expenses;
