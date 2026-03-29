import { useNavigate } from 'react-router-dom';

function StartPage() {
    let navigate = useNavigate();

    return (
        <div className="start-page">  
            <h1>Start Financial Literacy Journey</h1>
            <button onClick={() => navigate("/budgeting-form")}>Begin</button>
        </div>
    );
}

export default StartPage