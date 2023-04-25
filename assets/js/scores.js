var highscoresEl = document.getElementById("highscores");
var clearButton = document.getElementById("clear");

//get elements form local storage
var storedScores;


//view all scores
function renderScores() {
    //clear highscores 
    highscoresEl.innerHTML ="";

    //get all scores friom local storage
    storedScores = JSON.parse(localStorage.getItem("storedScores"));
    //if there are multiple scores, then sort from the highest score
    if (storedScores.length > 0) {
        storedScores.sort((a, b) => b[1] - a[1]);
    }

    //add all saved scores as list elements
    for (i = 0; i < storedScores.length; i++) {

        var indvidualScoreEl = document.createElement("li");
        indvidualScoreEl.textContent = storedScores[i][0] + " - " + storedScores[i][1];
        highscoresEl.appendChild(indvidualScoreEl);
    }
}

//render all scores
renderScores();

//when clear button is clicked
clearButton.addEventListener("click", function (event) {
    event.preventDefault();

    //delete all score entries
    storedScores.splice(0,storedScores.length);
    //update local storage
    localStorage.setItem("storedScores", JSON.stringify(storedScores));
    //render blank scores board
    renderScores();

})



