song1 = "";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score= 0;
song1_status = "";
song2_status = "";


function preload(){
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function gotPoses(results){
    score = results[0].pose.keypoints[9].score;
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    song1_status = song1.isPlaying();

    if(score>0.2){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Song 1";
        }
    }
}