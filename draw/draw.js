// Classifier Variable
console.log('hallo');
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/CHiBHL6xo/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";
  let marker;
  
  // Load the model first
  function preload() {
    
    classifier = ml5.imageClassifier(imageModelURL + 'model.json', modelLoaded);
    console.log(classifier);
  }

function modelLoaded() {
  console.log('Model Loaded!');
}

  function setup() {
    console.log('setup');
    marker = createVector(100, 100);
    
    createCanvas(320, 260);
    rect(0,0, 320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }

function draw() {
  fill(255);
   ellipse(marker.x, marker.y, 2, 2);
   //background(0);
    // Draw the video
    //image(flippedVideo, 0, 0);

    // Draw the label
    fill(255,0 ,0);
    textSize(16);
    textAlign(CENTER);
    //text('         ', width / 2, height - 4);
    //text(label, width / 2, height - 4);
}

 // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(video, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    //console.log(results);
    label = results[0].label;
    console.log(label);
    switch (label) {
      case "Up": 
        marker.add(createVector(0, -1));
        break;
      case "Down": 
        marker.add(createVector(0, 1));
      break;
         case "Left": 
        marker.add(createVector(-1, 0));
        break;
       case "Right": 
        marker.add(createVector(1, 0));
       break;
       case "Stop": 
        break;
    }
    
    // Classifiy again!
    classifyVideo();
  }
