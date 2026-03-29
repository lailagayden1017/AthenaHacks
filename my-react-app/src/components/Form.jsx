import { useState } from "react";

function Form() {
    return (
        <>
            <h1>Budgeting Form</h1>
            <form>
                <label className="college-label">What college do you attend?</label>
                <input type="text" placeholder="eg. University of Southern California" name="college" />

                <label className="allowance-label">Allowance:</label>
                <input type="text" placeholder="eg. $50" name="allowance" />

                <label className="job-label">Job Payment:</label>
                <input type="text" placeholder="eg. $50" name="job" />

                <label className="saving-label">Savings:</label>
                <input type="text" placeholder="eg. 10%" name="saving" />

                <button type="button">Reset</button>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Form