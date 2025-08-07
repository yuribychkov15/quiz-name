// This will hold the links and title for our quiz and navigation links
import { Link } from "react-router-dom";
// import Question from "./Question";

function Header() {
    return (
        <header>
            <h1>Which element are you?</h1>
            <h2>Based on random things</h2>
            <nav className="header-nav">
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </nav>
        </header>
    )
}

export default Header