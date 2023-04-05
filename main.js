noseX = 0;
noseY = 0;

leftWristX = 0;
rightWristX = 0;
difference = 0;



function setup() {
  video = createCapture(VIDEO);
  video.size(550, 500);
  canvas = createCanvas(450, 450);
  canvas.position(600, 130);

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('posenet model is initialized');
}

function draw() {
  background('#98fb98');
  document.getElementById("square_side").innerHTML = "Size of the Square =  " + difference + " px " ; 
  fill('white');
  stroke('blue');
  square(noseX, noseY, difference);
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("noseX = " + noseX + " noseY = " + noseY);

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;

    difference = floor(leftWristX - rightWristX);

    console.log("Left Wrist X = " + leftWristX + " Right Wrist X = " + rightWristX + " difference = " + difference);
  }
}