import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react";
import Header from "./components/Header"
import Question from "./components/Question";
import UserForm from "./components/UserForm";
import Results from "./components/Results";
import { UserProvider } from "./components/UserContext";

function App() {

  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  
  const [artwork, setArtwork] = useState(null);
  const [objectID, setObjectID] = useState(0);
  const [error, setError] = useState(null)
  
  const imgUrl = objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null


  const questions = [
    {
      question: "Choose the landscape that calls to your soul:",
      options: ["Lava-scorched mountains 🌋", "Crystal blue lagoon 🌊", "Ancient mossy forest 🌳", "Cloud-kissed cliffs 🌥️"],
    },
    {
      question: "What kind of power would you wield?",
      options: ["Summon blazing meteors ☄️", "Control ocean tides 🌊", "Grow life with a touch 🌿", "Ride the winds unseen 🌬️"],
    },
    {
      question: "Your energy in a room feels like:",
      options: ["An unstoppable wildfire 🔥", "A calming stream 🛶", "A grounding force 🧘", "A breath of fresh air 🍃"],
    },
    {
      question: "Which mythical creature would be your guardian?",
      options: ["Phoenix 🔥", "Mermaid 🧜‍♀️", "Forest Golem 🌲", "Sky Serpent 🐉"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    "Lava-scorched mountains 🌋": "Fire",
    "Crystal blue lagoon 🌊": "Water",
    "Ancient mossy forest 🌳": "Earth",
    "Cloud-kissed cliffs 🌥️": "Air",
  
    "Summon blazing meteors ☄️": "Fire",
    "Control ocean tides 🌊": "Water",
    "Grow life with a touch 🌿": "Earth",
    "Ride the winds unseen 🌬️": "Air",
  
    "An unstoppable wildfire 🔥": "Fire",
    "A calming stream 🛶": "Water",
    "A grounding force 🧘": "Earth",
    "A breath of fresh air 🍃": "Air",
  
    "Phoenix 🔥": "Fire",
    "Mermaid 🧜‍♀️": "Water",
    "Forest Golem 🌲": "Earth",
    "Sky Serpent 🐉": "Air",
  };
  
  // handle what changes occur when we click on an option, submit the user's name, finish the quiz
  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit(name) {
    setUserName(name);
  };

  function determineElement(answers) {
    const counts = {}
    answers.forEach(function(answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function(a, b) {
      return counts[a] > counts[b] ? a : b
    });
  }


  // randomly select an objectID
  const objectIDs = [436121, 437853, 438815, 436840, 437329, 437870, 459055, 435882, 45734]; // real artwork IDs

  function randomObjectID() {
    const randomIndex = Math.floor(Math.random() * objectIDs.length);
    return objectIDs[randomIndex];
  }

  // check when quiz is complete

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);

      const id = randomObjectID();
      setObjectID(id);
    }
  }, [currentQuestionIndex]); // run this everytime the question index changes


  useEffect(() => {
    if (!objectID) return;

    const fetchArtwork = async () => {
      try {
        const response = await fetch(imgUrl);
        if (!response.ok) {
          throw new Error("HTTP error!")
        }
        const result = await response.json()
        setArtwork(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchArtwork();

  }, [objectID])


  
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit}/>} />
            <Route 
              path="/quiz"
              element={
                currentQuestionIndex < questions.length ? (
                  <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer}/>
                ) : (
                  <Results element={element} artwork={artwork}/>
                )
              }
            
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
