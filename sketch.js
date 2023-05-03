// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Global variable to store the classifier
let classifier;

// Label (start by showing listening)
let label = "listening";

// Teachable Machine model URL:
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/Hytr0bJl3/model.json';


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModelURL);
}

function setup() {
  createCanvas(500, 500);
  bg = loadImage('map.png');
  bgend = loadImage('end.png');
  

  x = 50;
  y = 352.5;
  
  //Debugging location for player
  // x = 75;
  // y = 150;
  
  //lode variable for end screen
  screen = bg;
  
  rect1 = [0,390,500,110];
  rect2 = [0,195,299,120];
  rect3 = [363,195,135,120];
  rect4 = [363,0,135,120];
  rect5 = [0,0,50,120];
  rect6 = [115,0,185,120];
  end = [52,0,60,50];
  
  
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() {
  background(screen);
  //rect(rect1[0],rect1[1],rect1[2],rect1[3]);
  //rect(rect2[0],rect2[1],rect2[2],rect2[3]);
  //rect(rect3[0],rect3[1],rect3[2],rect3[3]);
  //rect(rect4[0],rect4[1],rect4[2],rect4[3]);
  //rect(rect5[0],rect5[1],rect5[2],rect5[3]);
  //rect(rect6[0],rect6[1],rect6[2],rect6[3]);
  //rect(end[0],end[1],end[2],end[3]);
  player = circle(x,y,20);
  
  //convert labels from model to inputs
  
  if (label === "LEFT"){
    x = x-2;
    y = y;
  }
  if (label === "RIGHT"){
    x = x+2;
    y = y;
  }
  if (label === "UP"){
    x = x;
    y = y-2;
  }
  if (label === "DOWN"){
    x = x;
    y = y+2;
  }
  
  //define boundry of play area
  if (x <= 0 || x >= 500 || y <= 0 || y >= 500){
    x = 50;
    y = 352.5;
  }
  
  //define obsticles, e.g. buildings
  if (y>=rect1[1]){
    x = 50;
    y = 352.5;
  }
  if (y<=rect2[1]+rect2[3] && x<=rect2[0]+rect2[2] && y>rect2[1]){
    x = 50;
    y = 352.5;
  }
  if (y<=rect3[1]+rect3[3] && x>=rect3[0] && y>rect3[1]){
    x = 50;
    y = 352.5;
  }  
  if (y<=rect4[1]+rect4[3] && x>=rect4[0] && y>rect4[1]){
    x = 50;
    y = 352.5;
  } 
  if (y<=rect5[1]+rect5[3] && x<=rect5[0]+rect5[2] && y>rect5[1]){
    x = 50;
    y = 352.5;
  }
  if (y<=rect6[1]+rect6[3] && x<=rect6[0]+rect6[2] && x>=rect6[0] && y>rect6[1]){
    x = 50;
    y = 352.5;
  }
  if (y<end[1]+end[3] && x <=end[0]+end[2]){
    screen = bgend;
  }
  
  //resets play area
  if (key == 'r'){
    screen = bg;
    x = 50;
    y = 352.5;
  }

}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}