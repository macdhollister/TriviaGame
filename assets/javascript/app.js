$(document).ready(function() {

    let startScreen = $("#startScreen");
    let questionScreen = $("#questionScreen");
    let gameOverScreen = $("#gameOverScreen");

    questionScreen.hide();

    game = {
        numCorrect: 0,
        numIncorrect: 0,
        numSkipped: 0,
        correctAnswer: "",
        userAnswer: "",
        currentTimeLeft: 20,
        // other stuff?
    }

    $("#start").click(function() {
        startScreen.hide();
        questionScreen.show();

        // start the timer
    })

    $(".answer").click(function(event) {
        game.userAnswer = event.target.id;

        if (event.target.id == game.correctAnswer) {
            alert("correct!");
            // This will change to "correct" screen
        } else {
            alert("incorrect");
            // This will change to "incorrect" screen
        }

    });

    function resetGame() {
        game.numCorrect = 0;
        game.numIncorrect = 0;
        game.numSkipped = 0;
        // update other stuff in game if needed
    }

    function newQuestion(q) {

        q = questionsData[q];
        $("#questionText").text(q.question);
        $("#a").text(q.a);
        $("#b").text(q.b);
        $("#c").text(q.c);
        $("#d").text(q.d);
        game.currentTimeLeft = 20;
        game.correctAnswer = q.correct;

        // start question timer from
        // currentTimeLeft
    }

    newQuestion(1);
})



/*
game object:
    correct answers
    incorrect answers
    skipped answers
    current currect answer
    current time left

Also possibly keep track of answers in the game object instead, then use a
update screen function to change what the displayed text is

Keep track of correct answer (in game object -- "a", "b", "c", or "d")
newQuestion updates correct answer


*/