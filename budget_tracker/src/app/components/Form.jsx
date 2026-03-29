import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import SavingsPage from "./SavingsPage";

export default function Form() {
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        cashFlow: "",
        frequency: "monthly",
        saveAmount: "",
        saveType: "dollars"
    });

    const nextPage = () => setPage(page + 1);
    const prevPage = () => setPage(page - 1);

    const navigate = useNavigate();

    const handleSubmit = () => {
        console.log("form data:", JSON.stringify(formData));
        navigate("/budget", { state: { formData } });
    };

    return (
        <>
            {page === 1 && <StartPage formData={formData} setFormData={setFormData} nextPage={nextPage} />}
            {page === 2 && <SavingsPage formData={formData} setFormData={setFormData} prevPage={prevPage} nextPage={handleSubmit} />}
        </>
    );
}