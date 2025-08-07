// Will have a search input that holds the name of the person taking the quiz for personalization
import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setInputName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setName(inputName);
        navigate("/quiz")
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={inputName} onChange={handleChange}/>
            </label>
            <button type="submit">Start Quiz</button>
        </form>
    )
}