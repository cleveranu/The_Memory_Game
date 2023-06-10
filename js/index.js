var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//when any keyboard key has been pressed,
$(document).keypress(function() {
  if (!started) {
    $("#ll").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //function to run if any button is clicked:-

  var userChosenColour = $(this).attr("id");//store the id of the button that got clicked
  userClickedPattern.push(userChosenColour);//add chosen colours to userChosenPattern list

  playSound(userChosenColour);//playSound of userChosenColour
  animatePress(userChosenColour);//animatePress of userChosenColour

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  //showing next sequence if user clicked correct tile
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {//if user clicks wrong tile
      playSound("wrong");
      $("body").addClass("game-over");
      $("#ll").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      
      //starts again if wrong
      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#ll").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*3)+1;//random no b/w 0-3
  var randomChosenColour = buttonColours[randomNumber];//random color 
  gamePattern.push(randomChosenColour);//add random color to pattern array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);//select button with id #blue(randomChosenColor)
  playSound(randomChosenColour);//playSound(blue);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");//add "pressed" class to the button that gets clicked
  //remove the pressed class after 100 ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//plays audio for color name input
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
  //lvl 0 and empty the pattern for a new game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
