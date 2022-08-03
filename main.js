Webcam.set({
    width:310,
    height:300,
    image_format:'png',
    png_quality:90,
}
);
camera=document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';

    });    
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/exNciydPX/model.json",modelLoaded);
function modelLoaded() {
    console.log("modelLoaded");
}
function speak() {
    var synth=window.speechSynthesis;
    speak_data1="the first prediction is "+prediction_1;
    speak_data2="the second prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}
function check() {
    img= document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.error(error);        
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if (results[0].label=='fist') {
            document.getElementById("update_emoji").innerHTML="&#9994";
        }
        if (results[0].label=='peace') {
            document.getElementById("update_emoji").innerHTML="&#9996";
        }
        if (results[0].label=='ok') {
        document.getElementById("update_emoji").innerHTML="&#128076";
        }
        if (results[0].label=='thumbs_up') {
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
        if (results[0].label=='clap') {
            document.getElementById("update_emoji").innerHTML="&#128079";
        }
        if (results[0].label=='rad') {
        document.getElementById("update_emoji").innerHTML="&#129304";
        }
        if (results[1].label=='thumbs_up') {
            document.getElementById("update_emoji2").innerHTML="&#128077";
        }
        if (results[1].label=='clap') {
            document.getElementById("update_emoji2").innerHTML="&#128079";
        }
        if (results[1].label=='rad') {
        document.getElementById("update_emoji2").innerHTML="&#129304";
        }
        if (results[1].label=='fist') {
            document.getElementById("update_emoji2").innerHTML="&#9994";
        }
        if (results[1].label=='peace') {
            document.getElementById("update_emoji2").innerHTML="&#9996";
        }
        if (results[1].label=='ok') {
        document.getElementById("update_emoji2").innerHTML="&#128076";
        }
    }
}