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
	if (data[0])
	{
		pose = data[0].pose;
		label = data[0].pose.score;
	}
}

function setup()
{
    var canvas = createCanvas(640,550);
	canvas.parent("canvasContainer");
    video = createCapture(VIDEO);
	video.hide();
    finger = loadImage('https://thumbs.dreamstime.com/z/hand-pointer-hands-pointing-finger-icon-isolated-white-75633117.jpg');
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
        text('Allow the camera to unleash the true', 10, 200);
		text('potential of our super elbow tracker 9000.', 10, 220);
    }
    else
	{
		translate(640, 0);
		scale(-1.0,1.0);
        image(video,0,0);
	}
	if (pose)
	{
		image(finger, pose.leftElbow.x - (size / 2), pose.leftElbow.y - (size / 2), size, size);
		//image(finger,0,0);
	}
}
