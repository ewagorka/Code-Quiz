var timerEl = document.getElementById('time');
var startScreenEl = document.getElementById('start');
var startButton = document.getElementById('start');
var questionsEl = document.getElementById('questions');
var endSccreenEl = document.getElementById('end-screen');
var feedbackEl = document.getElementById('feedback');


function countdown() {
    //set maximum time to 75 seconds
    var timeLeft = 75;

    // Use the `setInterval()` method to call a function to be executed every second
    var timeInterval = setInterval(function () {
        //if there's time left
        if (timeLeft > 0) {
            //display the time left
            timerEl.textContent = timeLeft;
            timeLeft--;
        }else{
            timerEl.textContent = "0";
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `end of quiz` function
           //TBD: end of quiz
        }

    }, 1000);
}

startButton.addEventListener('click', function (event) {
    event.preventDefault();
    countdown();

})
