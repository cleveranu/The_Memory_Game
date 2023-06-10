var buttonColours=["red","blue","green","yellow"];
var gamePatttern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(document).keypress(function(event){
  var key=event.key;
    if(!started && (key== 'A' || key=='a')){
        $("#ll").text("Level "+ level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#ll").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*3)+1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }
  function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
      console.log("Success");
        if(userClickedPattern.length=== gamePatttern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
      
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        
        $("#ll").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
  
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
  //plays audio for color name input
  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
   
  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
  