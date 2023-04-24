var timerEl = document.getElementById('time');
var startScreenEl = document.getElementById('start-screen');
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var endSccreenEl = document.getElementById('end-screen');
var feedbackEl = document.getElementById('feedback');
var choicesEl = document.getElementById("choices");
var titleEl = document.getElementById("question-title");

var submitInitials = document.getElementById("submit");

var timeLeft = 75;
var questionIndex = 0;

var isEnd = false;

var finalScore;
var scores =[];

//get questions from questions.js
var questions = JSON.parse(localStorage.getItem("questions"));
console.log(questions);

function showQuestions(questionIndex) {
    var storedScores = JSON.parse(localStorage.getItem("savedScores"));
    if(storedScores!=null){
        scores = storedScores;
    }
    console.log("hie");
    startScreenEl.setAttribute("class", "hide");

    //make question appear on the screen by changing class from hide to start
    questionsEl.setAttribute("class", "");

    var question = questions[questionIndex];

    console.log(question.question);
    titleEl.textContent = question.question;

    //add choices buttons
    for (i = 0; i < question.choices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = question.choices[i];
        choicesEl.appendChild(choiceButton);

        if (question.choices[i] == question.answer) {
            choiceButton.setAttribute("is-correct", "true");
        } else {
            choiceButton.setAttribute("is-correct", "false");
        }
    }

    feedbackEl.setAttribute("class", "feedback");
    feedbackEl.textContent = "";



}

function nextQuestion(questionIndex) {

    var question = questions[questionIndex];

    titleEl.textContent = question.question;

    //add choices buttons
    for (i = 0; i < question.choices.length; i++) {

        choicesEl.children[i].textContent = question.choices[i];

        if (question.choices[i] == question.answer) {
            choicesEl.children[i].setAttribute("is-correct", "true");
        } else {
            choicesEl.children[i].setAttribute("is-correct", "false");
        }
    }
}

function countdown() {
    // Use the `setInterval()` method to call a function to be executed every second
    var timeInterval = setInterval(function () {
        //if there's time left

        //prevents timer to display a negative number at the end in case games max time changes
        if (timeLeft <= 0) {
            timeLeft = 0;
        } else {
            timeLeft--;
        }
        timerEl.textContent = timeLeft;


        if (timeLeft <= 0 || isEnd) {

            clearInterval(timeInterval);
            showEndScreen();
        }

    }, 1000);
}

function startQuiz() {
    //set maximum time to 75 seconds
    timerEl.textContent = timeLeft;

    countdown();
    showQuestions(questionIndex);
}

function checkAnswer(answer) {

    //check if choses answer is correct
    if (answer.getAttribute("is-correct") == "true") {
        console.log("that is correct")
        feedbackEl.textContent = "Correct";
    } else {
        console.log("that is incorrect");
        timeLeft -= 10;
        feedbackEl.textContent = "Wrong!";
    }

    // if there's more questions then show the next question
    if (questionIndex < (questions.length - 1)) {
        console.log("NEXT");
        questionIndex++;
        nextQuestion(questionIndex);
    } else {
        //if there's no more questions, show end screen
        isEnd = true;
    }


};

function showEndScreen() {
    //hide questions section
    questionsEl.setAttribute("class", "hide");

    //show end screen
    endSccreenEl.setAttribute("class", "");

    finalScore = document.getElementById("final-score");
    finalScore.textContent = timeLeft;

}

//submitting initials
submitInitials.addEventListener("click", function (event) {

    event.preventDefault();
    console.log("submit");
    //get form elements
    var initialsEl = document.getElementById("initials")

    var initials = initialsEl.value.trim();
    initials = initials.toUpperCase();
    if (initials.length > 3 || initials.length == 0) {
        alert("ERROR! Initials must be 0-3 letters long!");
    } else {
        var currentScore = [initials, finalScore.textContent];
        scores.push(currentScore);
        localStorage.setItem("savedScores",JSON.stringify(scores));
        window.location.replace("highscores.html");
    }

})


startButton.addEventListener('click', startQuiz);

// When choices Element is clicked
choicesEl.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        console.log("CLICKED");
        //console.log(element.textContent);
        checkAnswer(element);

    }
});

