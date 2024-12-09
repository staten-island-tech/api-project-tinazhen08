import "../css/style.css";
import { DOMSelector } from "./dom";

//get data
//promise
//show data


async function getData(){
    try {
        //returns a promise 
        const response = await fetch ('https://stephen-king-api.onrender.com/api/books');
        //guard clause 
        if (response.status != 200) {
            throw new Error(response);
        }else{
            //convert promise to json
            const data = await response.json();
            return data.data
        }
    } catch (error) {
        alert("hey  I could not find that agent")
    }
};

let score = 0;

// Shuffle function to randomize the answer choices
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

function checkAnswer(selectedAnswer, correctAsnwer){
  if (selectedAnswer === correctAsnwer){
    score++
    DOMSelector.message.innerText = 'Correct Answer Selected!'
  }else{
    score === 0
    DOMSelector.message.innerText = `Incorrect Answer Selected! The correct answer was ${correctAsnwer}. Score has been reset.`
  }

  DOMSelector.score.innerText = `Score: ${score}`
  yearQuestion();
}

async function yearQuestion(){ //Random Question about book release year
  const data = await getData(); 
  const book = data[Math.floor(Math.random() * data.length)];
  const question = `What year was ${book.Title} published?`;

  const correctAnswer = book.Year;
  const wrongAnswers = [
    correctAnswer - 1,
    correctAnswer + 1,
    correctAnswer + 2
  ];

  const choices = shuffle([correctAnswer, ...wrongAnswers]);

  //Display question
  DOMSelector.question.innerText = question;
  DOMSelector.choices.innerHTML = '';

  choices.forEach((answer) => {
    DOMSelector.choices.insertAdjacentHTML(
      "beforeend",
      `<button type="click">${answer}</button>`
    )
  })

  DOMSelector.choices.addEventListener("click", function(event){
    event.preventDefault();
    checkAnswer(event.target.innerText, correctAnswer);
  })
}

yearQuestion();