var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressed = false;
var level = 0;

$(document).on('keypress', function(e) {
  if (!keyPressed) {
    keyPressed = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    playSound("wrong");
    $("body,html").addClass("game-over");


    setTimeout(function() {
      $("body,html").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  keyPressed = false;
  $(".red").css("background-color", "red"); 
  $(".green").css("background-color", "green");
  $(".blue").css("background-color", "blue");
  $(".yellow").css("background-color", "yellow");

}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  while (color === "#" || color === "#011F3F") {
  	for (var i = 0; i < 6; i++) {
    	color += letters[Math.floor(Math.random() * 16)];
  	}
  }

  return color;
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  if(level % 5 === 0) {
  	$(".red").css("background-color", getRandomColor); 
  	$(".green").css("background-color", getRandomColor);
  	$(".blue").css("background-color", getRandomColor);
  	$(".yellow").css("background-color", getRandomColor);
  	$("#level-title").text("Level " + level);
  }
  if(level % 5 !== 0) {
  $("#level-title").text("Level " + level);
  }
  var randomNum = Math.floor(Math.random() * 4);
  var colourChosen = buttonColours[randomNum];
  gamePattern.push(colourChosen);

  $("#" + colourChosen).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(colourChosen);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  var delay = 100; // miliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, delay);
}
