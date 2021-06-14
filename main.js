prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    img_format: "jpeg",
    jpeg_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='captured_img' src= '" + data_uri + "'/>";
    });
};

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NWSs0O1te/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    speakData = "The first prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);

        prediction = results[0].label;

        document.getElementById("result_emotion_name").innerHTML = prediction;

        speak();
    }
}