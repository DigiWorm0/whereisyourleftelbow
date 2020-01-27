const size = 100;

let mobilenet;
let video;
let label = '';
let pose;
let finger;
let loading = true;

function modelReady()
{
    console.log("Model is ready!!!");
    loading = false;
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
    finger = loadImage('finger.png');
    mobilenet = ml5.poseNet(video, modelReady);
}

function draw()
{
    background(0);
    fill(255);
    if (loading)
    {
        textSize(30);
        text('Loading...', 10, 100);
        textSize(15);
        text('Allow the camera to inspect your left elbow', 10, 200);
    }
    else
        image(video,0,0);
	if (pose)
	{
		image(finger, pose.leftElbow.x - (size / 2), pose.leftElbow.y - (size / 2), size, size);
		//image(finger,0,0);
	}
}
