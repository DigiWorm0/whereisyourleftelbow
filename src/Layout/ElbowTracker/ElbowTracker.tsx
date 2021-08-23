import React from "react";

declare var ml5: any;

const IMAGE_SIZE = 100;
const WIDTH = 640;
const HEIGHT = 550;
const CAM_CONSTRAINTS = {
    'audio': false,
    'video': true
};

class ElbowTracker extends React.Component
{
    cam?: HTMLVideoElement;
    stream?: MediaStream;

    ctx?: CanvasRenderingContext2D;
    elbowImg: HTMLImageElement;
    isElbowImgLoaded: boolean;

    poseNet: any;
    elbowX: number;
    elbowY: number;
    elbowC: number;
    
    isModelLoaded: boolean;

    // Init
    constructor(props: any)
    {
        super(props);

        this.isModelLoaded = false;
        this.isElbowImgLoaded = false;
        this.elbowX = 0;
        this.elbowY = 0;
        this.elbowC = 0;

        this.elbowImg = new Image();
        this.elbowImg.onload = (() => {
            this.isElbowImgLoaded = true;
        }).bind(this);
        this.elbowImg.src = "/whereisyourleftelbow/finger.jpg";
    }
    componentDidMount()
    {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        this.draw();
        this.initializeCamera();
    }
    componentWillUnmount() {
        if (this.stream)
            this.stream.getTracks().forEach(track => track.stop());
    }

    // Camera
    initializeCamera()
    {
        console.log("Initializing Camera...");
        navigator.mediaDevices
            .getUserMedia(CAM_CONSTRAINTS)
            .then(this.onCameraInit.bind(this));
    }
    onCameraInit(res: MediaStream)
    {
        console.log("Camera Initilaized!");
        
        this.stream = res;
        this.cam = document.getElementById("video") as HTMLVideoElement;
        this.cam.srcObject = this.stream;
        this.cam.play().then(this.initializeModel.bind(this));
        requestAnimationFrame(this.draw.bind(this));
    }

    // Model
    initializeModel()
    {
        console.log("Initializing Model...");
        this.poseNet = ml5.poseNet(this.cam, this.onModelInit.bind(this));
    }
    onModelInit()
    {
        console.log("Model Initilaized!");
        this.isModelLoaded = true;
        this.poseNet.on('pose', this.onPose.bind(this));
    }

    // Draw
    onPose(result: any)
    {
        if (!(result[0]))
            return;

        let pose = result[0].pose;
        this.elbowX = pose.leftElbow.x;
        this.elbowY = pose.leftElbow.y;
        this.elbowC = pose.score;
        requestAnimationFrame(this.draw.bind(this));
    }
    draw()
    {
        if (!(this.ctx))
            return;
        
        if (this.isModelLoaded)
        {
            if (this.cam)
                this.ctx.drawImage(this.cam, 0, 0, WIDTH, HEIGHT);
            if (this.isElbowImgLoaded)
                this.ctx.drawImage(
                    this.elbowImg,
                    this.elbowX - (IMAGE_SIZE / 2),
                    this.elbowY - (IMAGE_SIZE / 2),
                    IMAGE_SIZE,
                    IMAGE_SIZE
                );
        }
        else
        {
            this.ctx.font = "30px Comic Sans MS";
            this.ctx.fillText("Loading...", 10, 100);
            this.ctx.font = "15px Comic Sans MS";
            this.ctx.fillText("Allow the camera to unleash the true",       10, 200);
            this.ctx.fillText("potential of our super elbow tracker 9000",  10, 220);
        }
    }

    // React
    render()
    {
        return (
            <div id="canvas-container">
                <canvas id="canvas" width={WIDTH} height={HEIGHT} />
                <video id="video" className="d-none" width={WIDTH} height={HEIGHT} />
            </div>
        )
    }
}
export default ElbowTracker;
