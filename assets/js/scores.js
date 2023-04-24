var highscoresEl = document.getElementById("highscores");
var clearButton = document.getElementById("clear");

//get elements form local storage
var savedScores;

//sort scores from highest to lowest if the array is not empty


//view all scores
function renderScores() {
    //clear highscores 
    highscoresEl.innerHTML ="";

    //get all scores fri=om local storage
    savedScores = JSON.parse(localStorage.getItem("savedScores"));
    //if there are multiple scores, then sort from the highest score
    if (savedScores.length > 0) {
        savedScores.sort((a, b) => b[1] - a[1]);
    }
    for (i = 0; i < savedScores.length; i++) {

        var indvidualScoreEl = document.createElement("li");
        indvidualScoreEl.textContent = savedScores[i][0] + " - " + savedScores[i][1];
        highscoresEl.appendChild(indvidualScoreEl);
    }
}


renderScores();

//when clear button is clicked
clearButton.addEventListener("click", function (event) {
    event.preventDefault();

    //delete all score entries
    savedScores.splice(0,savedScores.length);
    //update local storage
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    //render blank scores board
    renderScores();

})



