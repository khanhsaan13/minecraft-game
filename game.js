var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["village", "pig", "steve", "sheep"];

function nextSequence(){
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);  

    // for(var i = 0; i < 4; i ++){
    //     var randomChosenColour = buttonColours[nextSequence()]; 
    //     gamePattern.push(randomChosenColour);  
    //     console.log(gamePattern[i]);s
    // }

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed"), 100
    })
}

var track = 0;
var level = 0;

$(document).on("keydown", function(){
    track++;
    if(track === 1){
        nextSequence();
        $("h1").text("Level " + level);
        level++;
    }
});

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress();
    checkAnswer(userChosenColour);
});

var trackArr = [];
function checkAnswer(currentLevel){
    var check = true;
    if(gamePattern.indexOf(currentLevel) === userClickedPattern.indexOf(currentLevel)){
        // console.log("true");
        trackArr = userClickedPattern;
    }
    else{
        check = false;
        // console.log("false");
        $("h1").html("Game Over, Press Any Key to Restart");
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        // move the background img
        $("body").removeClass("background-img");
        // add background color game-over
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        
        // add background-img again
        setTimeout(function(){
            $("body").addClass("background-img")
        }, 200);
        
        $(document).on("keydown", startOver);
    }
    if(gamePattern.length === userClickedPattern.length && check === true){
        userClickedPattern = [];
        var correct = new Audio("./sounds/Correct.mp3");
        correct.play();
        $("body").addClass("game-continue");
        setTimeout(function(){
            $("body").removeClass("game-continue");
        }, 200);
        setTimeout(function(){
            nextSequence();
            $("h1").text("Level " + level);
            track == 0;
            level++;
        }, 1000);
        // move the background img
        setTimeout(function(){
            $("body").removeClass("background-img");
            $("body").addClass("game-continue");
        }, 200);
        
        setTimeout(function(){
            $("body").removeClass("game-continue")
        }, 200);
        
        // add background-img again
        setTimeout(function(){
            $("body").addClass("background-img")
        }, 200);
        
    }
}

function startOver(){
    location.reload();
}










