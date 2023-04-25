//create an array of question objects
var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        choices:[ "1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"

    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        choices:[ "1. quotes", "2. curly brackets","3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"

    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        choices:[ "1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"

    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        choices:[ "1. commas", "2. curly brackets","3. quotes", "4. parenthesis"],
        answer: "3. quotes"

    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices:[ "1. JavaScript","2. terminal/bash","3. for loops", "4. console.log"],
        answer: "4. console.log"

    },
];

//save all questions to local storage
localStorage.setItem("questions",JSON.stringify(questions));