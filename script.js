// list of the varlianbles goes here

var choicesEl = document.querySelector("#choices");
var choice1El = document.querySelector("#choice1");
var choice2El = document.querySelector("#choice2");
var choice3El = document.querySelector("#choice3");
var choice4El = document.querySelector("#choice4");
var allDoneEl = document.querySelector("#all-done");
var submitBtnEl = document.querySelector("#submitBtn");
var myFormEl = document.queryCommandEnabled("#myForm");
var inputInitialsText;
var goBackBtnEl = document.querySelector("#goBackBtn");
var clearScoresBtnEl = document.querySelector("#clearScoresBtn");
var responseFeedbackEl = document.querySelector("#response-feedback");
var questionIndex = 0;
var timeLeft = 60; // I think 60 seconds would be suitable for four questions
var timerRunning = false;
var timerPenalty = 10;
var quizIntroEl = document.querySelector("#quiz-intro");
var quizContainerEl = document.querySelector("#quiz-container");
var questionTitleEl = document.querySelector("#question");
var timerInterval;
var timeLeftEl = document.querySelector("#timeLeft");
var startEl = document.querySelector("#start-btn");
var highScoresEl = document.querySelector("#high-scores");
var finalScoreEl = document.querySelector("#final-score");
var highScoresContainerEl = document.querySelector("#highscores-container");
var highScores = [];
var highscoresBtnEl = document.querySelector("#highscores-btn");

// The list of the questions goes here
var questions = [
  {
    questionTitle: "_______ is the process of finding errors and fixing them within a program.",
    choice1: "1-Compiling",
    choice2: "2-Excuting",
    choice3: "3-Scanning",
    choice4: "4-Debugging",
    answer: "choice4"
  },

  {
    questionTitle: "During program development, software requirements specify:",
    choice1: "1-How the program will accomplish the task",
    choice2: "2-What task the program must perform",
    choice3: "3-How to divide the task into subtasks",
    choice4: "4-How to test the program when it is done",
    answer: "choice2"
  },

  {
    questionTitle: "What does 'var' mean in javascript?",
    choice1: "1-Variable",
    choice2: "2-Various",
    choice3: "3-Variety",
    choice4: "4-Varicose vein",
    answer: "choice1"
  },

  {
    questionTitle: "Which symbol indicates 'id'?",
    choice1: "1-@",
    choice2: "2-*",
    choice3: "3-#",
    choice4: "4-!",
    answer: "choice3"
  }
];

//  I tried to put this variable in the variables list, but it did not work
var currentQuestion = questions[questionIndex]; 

// list of the functions goes here
function startQuiz() {
  if (timerRunning === false) {
    highscoresBtnEl.removeEventListener("click", viewhighScores);
    timerRunning = true;
    timerInterval = setInterval(function() {
      timeLeft--;

      timeLeftEl.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        finish();
      }
    }, 1000);
  }
  displayQuestion();
}

function displayQuestion() {
  quizIntroEl.classList.remove("d-flex"); 
  quizIntroEl.classList.add("d-none");
  highScoresContainerEl.classList.add("d-none");
  quizContainerEl.classList.remove("d-none");

  currentQuestion = questions[questionIndex];
  questionTitleEl.textContent = currentQuestion.questionTitle;
  choice1El.textContent = currentQuestion.choice1;
  choice2El.textContent = currentQuestion.choice2;
  choice3El.textContent = currentQuestion.choice3;
  choice4El.textContent = currentQuestion.choice4;
}

choicesEl.addEventListener("click", function(e) {
  selectedchoice(e, currentQuestion);
}); 

function selectedchoice(e, currentQuestion) {
  e.preventDefault;
  var selectedBtn = e.target;
  questionIndex++; 
  console.log(selectedBtn);
  console.log(currentQuestion);
 
  // conditions
  if (selectedBtn.getAttribute("id") === currentQuestion.answer) {

    console.log("correct answer selected");
    responseFeedbackEl.textContent = "Correct Answer!";
    responseFeedbackEl.classList.add("bg-secondary");
    setTimeout(function() {
      responseFeedbackEl.textContent = "";
      responseFeedbackEl.classList.remove("bg-secondary");
    }, 1000);
  } else {
    responseFeedbackEl.classList.add("bg-warning");
    responseFeedbackEl.textContent = "Incorrect Answer!";

    setTimeout(function() {
      responseFeedbackEl.textContent = "";
      responseFeedbackEl.classList.remove("bg-warning");
    }, 1000); 
    timeLeft = timeLeft - timerPenalty;
    console.log(timeLeft + "after wrong answer deduction");
  }

  if (questionIndex === questions.length) {
   
    console.log("No more questions");
    console.log(questionIndex);
    console.log(questions.length);
    timeLeftEl.textContent = timeLeft; 
    clearInterval(timerInterval);
    console.log(timeLeft + " after no more questions");
    
    finish();
  } else {
    displayQuestion();
  }
}

function getInputValue() {
  var inputInitialsText = document.getElementById("inputInitials").value.trim(); 
  return inputInitialsText; 
}

function finish() {
  finalScoreEl.textContent = timeLeft;
  setTimeout(function() {
    allDoneEl.classList.remove("d-none");
    quizContainerEl.classList.add("d-none");
  }, 1500); 
}

submitBtnEl.addEventListener("click", function() {
  var enteredInitials = getInputValue();
  highScores.push({ initials: enteredInitials, score: timeLeft }); 

  localStorage.setItem("score", JSON.stringify(highScores));
  console.log(JSON.stringify(highScores));
  timeLeft = 60; 
  questionIndex = 0;
  viewhighScores();
  highscoresBtnEl.addEventListener("click", viewhighScores); 
});

// end of the quiz

function viewhighScores() {
  highScoresContainerEl.classList.remove("d-none");
  allDoneEl.classList.add("d-none");
  quizIntroEl.classList.add("d-none");
  quizContainerEl.classList.add("d-none");
  highScoresEl.innerHTML = ""; 
  var storedScores = JSON.parse(localStorage.getItem("score")) || [];
  console.log(storedScores);
  storedScores.forEach(element => {
   
    var newInitialsEl = document.createElement("h4");
    newInitialsEl.textContent = element.initials + " - " + element.score;
    highScoresEl.appendChild(newInitialsEl);
  });
} 

function reStart() {
  highScoresContainerEl.classList.add("d-none");
  quizIntroEl.classList.remove("d-none");
  inputInitialsText = "";
  timerRunning = false;
 
}
highscoresBtnEl.addEventListener("click", viewhighScores);
startEl.addEventListener("click", startQuiz);
goBackBtnEl.addEventListener("click", reStart);
clearScoresBtnEl.addEventListener("click", function() {
  highScores = [];
  localStorage.setItem("score", JSON.stringify(highScores));
  console.log(highScores);
  viewhighScores();
});
