//get access to html elements
var timerEl = document.getElementById('time');
var startScreenEl = document.getElementById('start-screen');
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var endSccreenEl = document.getElementById('end-screen');
var feedbackEl = document.getElementById('feedback');
var choicesEl = document.getElementById("choices");
var titleEl = document.getElementById("question-title");
var submitInitials = document.getElementById("submit");

//use to set game's time
var timeLeft = 75;

//use to decide which question's being rendered
var questionIndex = 0;

//get questions from questions.js
var questions = JSON.parse(localStorage.getItem("questions"));

//use to check if game has ended
var isEnd = false;

//use to store final score
var finalScore;

//use to add scores to
var scores = [];



//function initialises the game
function init(questionIndex) {
    //get scores local storage
    var storedScores = JSON.parse(localStorage.getItem("storedScores"));
    if (storedScores != null) {
        //if there are scores being saved, update the scores array with the data from local storage
        scores = storedScores;
    }

    //hide start screen
    startScreenEl.setAttribute("class", "hide");

    //make question appear on the screen by changing class from hide to start
    questionsEl.setAttribute("class", "");

    //hold all data from one question object
    var question = questions[questionIndex];

    //set question's title
    titleEl.textContent = question.question;

    //create choices buttons and set answer for each
    for (i = 0; i < question.choices.length; i++) {

        var choiceButton = document.createElement("button");
        choiceButton.textContent = question.choices[i];
        choicesEl.appendChild(choiceButton);

        //if the current button holds the correct answer mark it as correct
        if (question.choices[i] == question.answer) {
            choiceButton.setAttribute("is-correct", "true");
        } else {
            choiceButton.setAttribute("is-correct", "false");
        }
    }

    //add styling to feedback text
    feedbackEl.setAttribute("class", "feedback");
    //keep feedback text empty to start with
    feedbackEl.textContent = "";
}

//function switches current screen to the next question
//takes questionIndex as a parameter, which decides which question will be rendered
function nextQuestion(questionIndex) {

    //holds the data of chosen question object
    var question = questions[questionIndex];

    //update question title
    titleEl.textContent = question.question;

    //update the buttons' text
    for (i = 0; i < question.choices.length; i++) {

        choicesEl.children[i].textContent = question.choices[i];

        //if the current button holds the correct answer mark it as correct
        if (question.choices[i] == question.answer) {
            choicesEl.children[i].setAttribute("is-correct", "true");
        } else {
            choicesEl.children[i].setAttribute("is-correct", "false");
        }
    }
}

//function manages the timer 
function countdown() {
    // Uses the `setInterval()` method to call a function to be executed every second
    var timeInterval = setInterval(function () {
    
        //prevents timer to display a negative number at the end in case games max time changes
        if (timeLeft <= 0) {
            timeLeft = 0;
        } else {
            //if there's time left, reduce the time
            timeLeft--;
        }
        //update time displayed
        timerEl.textContent = timeLeft;

        //if there's no time left or the user answered all the questions
        if (timeLeft <= 0 || isEnd) {
            //clear the timer and show the end screen
            clearInterval(timeInterval);
            showEndScreen();
        }

    }, 1000);
}

// function starts the quiz game
function startQuiz() {
    //set maximum time to 75 seconds
    timerEl.textContent = timeLeft;

    //start the timer
    countdown();
    //initialise the game
    init(questionIndex);
}

//function checks if the answer is correct and if the current question is the last one
function checkAnswer(answer) {

    //check if choses answer is correct
    if (answer.getAttribute("is-correct") == "true") {
        //if correct display 'Correct!'
        feedbackEl.textContent = "Correct!";
    } else {
        //if incorrect, reduce time display 'Wrong!'
        timeLeft -= 10; and
        feedbackEl.textContent = "Wrong!";
    }

    // if there's more questions then show the next question
    if (questionIndex < (questions.length - 1)) {
        questionIndex++;
        nextQuestion(questionIndex);
    } else {
        //if there's no more questions, show end screen
        isEnd = true;
    }

};

//function renders the end screen
function showEndScreen() {

    //hide questions section
    questionsEl.setAttribute("class", "hide");

    //show end screen
    endSccreenEl.setAttribute("class", "");

    //show user their score, which is equal to the time that's left
    finalScore = document.getElementById("final-score");
    finalScore.textContent = timeLeft;

}

//submitting initials
submitInitials.addEventListener("click", function (event) {

    event.preventDefault();

    //get form elements
    var initialsEl = document.getElementById("initials")
    //trim and capitalise initials
    var initials = initialsEl.value.trim();
    initials = initials.toUpperCase();

    //if initials are longer than 3 characters, then alert the iser
    if (initials.length > 3 || initials.length == 0) {
        alert("ERROR! Initials must be 0-3 letters long!");
    } else {
        //add user's score and intials to the scores array
        var currentScore = [initials, finalScore.textContent];
        scores.push(currentScore);
        //save the scores array in local storage
        localStorage.setItem("storedScores", JSON.stringify(scores));
        //switch to highscores page
        window.location.replace("highscores.html");
    }

})

//start quiz when the start button is clicked
startButton.addEventListener('click', startQuiz);

// When answer button is clicked
choicesEl.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        //check the answer
        checkAnswer(element);

    }
});

