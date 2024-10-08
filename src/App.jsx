import { useEffect, useState } from 'react'
import './App.css';
import OptionCon from './assets/Component/OptionCon';
import './assets/css/optionCon.css';

function App() {
  const [question, setquestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [explanation, setEplanation] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  async function fetchQuestion() {
    let response = await fetch("https://aptitude-api.vercel.app/Random", {
      method: "GET"
    });

    let data = await response.json();
    console.log(data);

    setquestion(data);
    setEplanation(null);
    setSubmitted(false);
  }

  const checkAnswer = () => {
    let index = question["options"].indexOf(question.answer);
    console.log(index);
    document.getElementsByClassName("option")[index].style.background = "green";
    setEplanation(question.explanation);
    setSubmitted(true);
  }

  useEffect(() => {
    fetchQuestion();
  }, [])

  return (
    <>
      <section className="wrapper">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </section>
      {
        (question == null) ? "Loading" :
          <div className='question-container' >
            <div className="question">{question.question}</div>
            <div className="options">
              {
                question.options.map((opt) => {
                  return <OptionCon option={opt} key={opt} checked={selected} change={(e) => {
                    setSelected(e.target.value)
                  }} />
                })
              }
            </div>
            {
              explanation ?
                <div className="explanation">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 256 256"
                  >
                    <g fill="#ffffff" fillRule="nonzero" stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      style={{ mixBlendMode: 'normal' }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM25,11c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3zM21,21v2h1h1v13h-1h-1v2h1h1h4h1h1v-2h-1h-1v-15h-1h-4z" />
                      </g>
                    </g>
                  </svg>

                  {explanation}
                </div>
                : ""
            }
            {
              submitted ?
                <button onClick={fetchQuestion}>Next Question</button> :
                <button onClick={checkAnswer}>Submit</button>
            }
          </div>
      }
    </>
  )
}

export default App
