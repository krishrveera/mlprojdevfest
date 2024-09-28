let classifier;
let video;
let imageModel = 'https://teachablemachine.withgoogle.com/models/entdSPV4B/'
let flippedVideo;
let label = "";
function preload(){
  classifier = ml5.imageClassifier(imageModel + 'model.json');
  }
function setup() {
  createCanvas(640, 520); // creates a preview window
  video = createCapture(VIDEO); // accesses my laptops camera
  video.size(640,490); // dimensions of the video window
  video.hide(); // hides the dual camera if the device has one
  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}
function draw() {
  background(0);
  image(flippedVideo,0,0); // flips the video preview
  fill("red"); // the colour of the text
  textSize(20);
  textAlign(CENTER);
  text(label, width / 2, height-8)
}
function classifyVideo(){
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo,gotResult);
  flippedVideo.remove()
}
function gotResult(error,results){
  if(error){
    console.error(error)
    return;
  } 
  label = results[0].label;
  classifyVideo();
}