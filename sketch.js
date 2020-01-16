const size = 50;

let mobilenet;
let video;
let label = '';
let pose;
let finger;

function modelReady()
{
    console.log("Model is ready!!!");
	mobilenet.on("pose", function(results) {
	  gotResults(results);
	});
}

function gotResults(data)
{
    console.log(data);
	if (data[0])
	{
		pose = data[0].pose;
		label = data[0].pose.score;
	}
}

function setup()
{
    createCanvas(640,550);
    video = createCapture(VIDEO);
	video.hide();
    mobilenet = ml5.poseNet(video, modelReady);
	finger = loadImage('finger.png');
}

function draw()
{
    background(0);
    image(video,0,0);
	fill(0);
	if (pose)
	{
		image(finger, pose.leftElbow.x - (size / 2), pose.leftElbow.y - (size / 2), size, size);
		//	Draws finger on your left elbow
	}
}