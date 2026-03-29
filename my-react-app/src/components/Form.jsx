import { useState } from "react";
import FormPage1 from './FormPage1'
import FormPage2 from './FormPage2'

function Form() {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({});

    const nextPage = () => setPage(page + 1);
    const prevPage = () => setPage(page - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Form submitted! " + JSON.stringify(formData));
    };

    return (
        <>
            <h1>Budgeting Form</h1>
            <form onSubmit={handleSubmit}>
                {page === 1 && (
                    <FormPage1 formData={formData} setFormData={setFormData} nextPage={nextPage} />
                )}
                {page === 2 && (
                    <FormPage2 formData={formData} setFormData={setFormData} prevPage={prevPage} />
                )}
            </form>
        </>
    );
}

export default Form