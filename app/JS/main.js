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
        return null
    }
};

let score = 0;
let questionInProgress = false;

//Shuffle function to randomize the answer choices
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
    score = 0
    DOMSelector.message.innerText = `Incorrect Answer Selected! The correct answer was ${correctAsnwer}. Score has been reset.`
  }

  DOMSelector.score.innerText = `Score: ${score}`
  DOMSelector.question.innerText = "";
  DOMSelector.choices.innerHTML = "";

  questionInProgress = false;  
  genRandomQuestion();
}

function displayQuestion(question, choices, correctAnswer){
  //Display question
  DOMSelector.question.innerText = question;

  choices.forEach((answer) => {
    DOMSelector.choices.insertAdjacentHTML(
      "beforeend",
      `<button class="btn btn-secondary h-20 px-6 m-2 text-3xl" type="click">${answer}</button>`
    );
  });

  function handleChoiceClick(event) {  
    event.preventDefault();  
    DOMSelector.choices.removeEventListener("click", handleChoiceClick);  
    checkAnswer(event.target.innerText, correctAnswer);  
   }  
   
  DOMSelector.choices.addEventListener("click", handleChoiceClick);
}

async function genRandomQuestion() {
  if (questionInProgress) {  
    return;  
   }  
  questionInProgress = true;

  const randomQuestion = Math.floor(Math.random() * 3);

  let questionData;

  if (randomQuestion === 0) {
    questionData = await year();
  } else if (randomQuestion === 1) {
    questionData = await publisher();
  } else {
    questionData = await villain();
  }

  if (!questionData || !questionData.question || !questionData.choices) {
    console.log("Error: Invalid question data", questionData);
    return; 

  }
  displayQuestion(questionData.question, questionData.choices, questionData.correctAnswer);
}


async function year(){ //Random question about book release year
  try {  
    const data = await getData();  
    if (!data) {  
     return null; 
    }else{
      const book = data[Math.floor(Math.random() * data.length)];
      const question = `What year was ${book.Title} published?`;
      console.log("Question:", question);  //Log the question for verification
    
      const correctAnswer = book.Year;
      const wrongAnswers = [
        correctAnswer - 1,
        correctAnswer + 1,
        correctAnswer + 2
      ];
    
      const choices = shuffle([correctAnswer, ...wrongAnswers]);
      console.log("Choices:", choices);  //Log the choices for verification
      return {question, choices, correctAnswer}
    }
  } catch (error) {
      alert("hey  I could not find that agent")
  }
}

async function publisher(){ //Random question about book publisher 
  try {  
    const data = await getData();  
    if (!data) {  
     return null;
    }else{
      const book = data[Math.floor(Math.random() * data.length)];
      const question = `What was the publisher of the book "${book.Title}"?`;
      console.log("Question:", question);  //Log the question for verification

      const correctAnswer = book.Publisher
      const wrongAnswers = [];
      while (wrongAnswers.length < 3) {
        const randomBook = data[Math.floor(Math.random() * data.length)];
        if (randomBook.Publisher !== correctAnswer && !wrongAnswers.includes(randomBook.Publisher)) {
          wrongAnswers.push(randomBook.Publisher);
        }
      }

      const choices = shuffle([correctAnswer, ...wrongAnswers]);
      console.log("Choices:", choices);  //Log the choices for verification

      return {question, choices, correctAnswer}
    }
  } catch (error) {
      alert("No data found")
  }
}

async function villain() {
  try {  
    const data = await getData();  
    if (!data) {  
     return null;
    }else{
      let book = data[Math.floor(Math.random() * data.length)];
      //Check if the selected book has villains
      if (!book.villains || book.villains.length === 0) {
        console.log(`No villains found in ${book.Title}, selecting another book.`);
        return villain();  
      }
      
      const selectedVillain = book.villains.length === 1
        ? book.villains[0]   // If only one villain, select it
        : book.villains[Math.floor(Math.random() * book.villains.length)]; //If more than 1, select randomly

      const question = `Which villain was in the book "${book.Title}"?`;
      console.log("Question:", question);  //Log the question for verification

      const correctAnswer = selectedVillain.name
      const wrongAnswers = [];
      while (wrongAnswers.length < 3) {
        const randomBook = data[Math.floor(Math.random() * data.length)];
        if (randomBook.Title !== book.Title && randomBook.villains && randomBook.villains.length > 0) {
          const randomVillain = randomBook.villains[Math.floor(Math.random() * randomBook.villains.length)];
          if (randomVillain && !wrongAnswers.includes(randomVillain.name)) {
            wrongAnswers.push(randomVillain.name);
          }
        }
      }

      const choices = shuffle([correctAnswer, ...wrongAnswers]);
      console.log("Choices:", choices);  //Log the choices for verification

      return {question, choices, correctAnswer}
    }
  } catch (error) {
      alert("hey  I could not find that agent")
  } 
}

async function createStart(){
  DOMSelector.startBtn.addEventListener("click", async function(event){
    event.preventDefault();
    console.log("Start Button Clicked!")

    DOMSelector.container.innerHTML = "";
    
    DOMSelector.container.insertAdjacentHTML(
      "beforeend",
      `<div class="grid justify-items-center" id="card">
        <h2 class="text-6xl text-center my-10" id="question"></h2>
        <div class="flex flex-row space-x-4 justify-center" id="choices" ></div>
        <h3 class="text-4xl" id="score">Score: 0</h3>
        <p class="text-4xl my-10" id="message"></p>
      </div>`
    );
    DOMSelector.question = document.getElementById('question');
    DOMSelector.choices = document.getElementById('choices');
    DOMSelector.score = document.getElementById('score');
    DOMSelector.message = document.getElementById('message');

    DOMSelector.startBtn.remove();

    await genRandomQuestion();

  })
};

createStart();