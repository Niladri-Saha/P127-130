song1="";
song2="";
song1_status="";
song2_status="";
scoreLeftWrist=0;
scoreRightWrist=0;
rightWristX=0;
leftWristX=0;
leftWristY=0;
rightWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture();
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill("#ffcc00");
    stroke("0099ff");
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="playing HARRY POTTER THEME SONG";
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing PETER PAN SONG";
        }
    }
}
function preload(){
    song1=loadSound("music2.mp3");
    song2=loadSound("music.mp3");
}
function play(){
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
        console.log("scoreRightWrist = "+scoreRightWrist);
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("leftWristX= "+leftWristX);
        console.log("rightWristX= "+rightWristX);
        console.log("leftWristY= "+leftWristY);
        console.log("rightWristY= "+rightWristY);
    }
}