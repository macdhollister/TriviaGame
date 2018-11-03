$(document).ready(function() {

    let startScreen = $("#startScreen");
    let questionScreen = $("#questionScreen");
    let questionAnsweredScreen = $("#questionAnsweredScreen");
    let gameOverScreen = $("#gameOverScreen");
    let answerImage = $("#answerImage");

    let timeLeft = $("#timeLeft");

    game = {
        currentQuestion: 0,
        numCorrect: 0,
        numIncorrect: 0,
        numSkipped: 0,
        question: null,
        currentTimeLeft: 5, // change to 20
        timer: null,
        // other stuff?
    }

    $("#start").click(function() {
        startScreen.hide();
        questionScreen.show();
        newQuestion(0);
    })

    $(".answer").click(function(event) {
        giveAnswer(event.target.id);
    });

    $("#restart").click(function() {
        resetGame();
    })

    function resetGame() {
        game.numCorrect = 0;
        game.numIncorrect = 0;
        game.numSkipped = 0;
        game.currentQuestion = 0;

        gameOverScreen.hide();
        startScreen.show();
    }

    function newQuestion(q) {
        game.timer = setInterval(function() {
            game.currentTimeLeft--;
            timeLeft.text(game.currentTimeLeft);
            console.log(game.currentTimeLeft);

            if (game.currentTimeLeft <= 0) {
                giveAnswer("none");
            }
        }, 1000);

        startScreen.hide();
        questionScreen.show();

        game.question = questionsData[q];

        q = questionsData[q];
        $("#questionText").text(q.question);
        $("#a").text(q.a);
        $("#b").text(q.b);
        $("#c").text(q.c);
        $("#d").text(q.d);
        game.currentTimeLeft = 5;
    }

    function giveAnswer(userAnswer) {
        clearInterval(game.timer);
        $("#correctAnswer").text(game.question[game.question.correct]);

        let randSelect = Math.floor(Math.random()*6 + 1);

        // unanswered
        if (userAnswer === "none") {
            answerImage.attr("src", "assets/images/unanswered.gif");
            $("#rightWrong").text("You didn't answer!");
            game.numSkipped++;

        // correct answer
        } else if (userAnswer === game.question.correct) {
            $("#rightWrong").text("Correct!");
            game.numCorrect++;
            answerImage.attr("src", `assets/images/correct/${randSelect}.gif`);
        // incorrect answer
        } else {
            $("#rightWrong").text("Wrong!");
            game.numIncorrect++;
            answerImage.attr("src", `assets/images/incorrect/${randSelect}.gif`);
        }


        questionScreen.hide();
        questionAnsweredScreen.show();

        setTimeout(function() {
            game.currentQuestion++;
            if (game.currentQuestion < questionsData.length) {
                newQuestion(game.currentQuestion);
            } else {
                questionAnsweredScreen.hide();
                gameOverScreen.show();

                $("#numCorrect").text(game.numCorrect);
                $("#numIncorrect").text(game.numIncorrect);
                $("#unanswered").text(game.numSkipped);
                console.log(
                    `Correct Answers: ${game.numCorrect}`,
                    `Incorrect Answers: ${game.numIncorrect}`,
                    `Unanswered: ${game.numSkipped}`
                )
            }
        }, 5000);
    }

    // startScreen.hide()
    questionScreen.hide();
    questionAnsweredScreen.hide();
    gameOverScreen.hide();
})