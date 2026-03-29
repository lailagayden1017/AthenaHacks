function Income({ formData, setFormData, nextPage }) {
  return (
    <div>
      <h2>Income Per Week</h2>

      <label>Allowance</label>
      <input
        type="text"
        placeholder=""
        value={formData.allowance || ''}
        onChange={e => setFormData({ ...formData, allowance: e.target.value })}
      />
      <br />

      <label>Job Payment</label>
      <input
        type="text"
        placeholder=""
        value={formData.job || ''}
        onChange={e => setFormData({ ...formData, job: e.target.value })}
      />
      <br />

      <label>Other Income</label>
      <input
        type="text"
        placeholder=""
        value={formData.income || ''}
        onChange={e => setFormData({ ...formData, income: e.target.value })}
      />
      <br />

      <label>Percentage to Saving</label>
      <input
        type="text"
        placeholder=""
        value={formData.saving || ''}
        onChange={e => setFormData({ ...formData, saving: e.target.value })}
      />
      <br />
      <br />
      <button type="button" onClick={nextPage}>Next</button>

    </div>
  );
}

export default Income;
