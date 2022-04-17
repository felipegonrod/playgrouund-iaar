// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
var n = 0;
var m = 0;
var k = 0;
var z = 0;

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      //console.log('reconociendo: ' + (n/2) + "%");
      const x = obj['0'];
      if (n <= 20) {
        if (obj.length !== 0) {
          if (x['class'] == "bottle") {
            n = n + 1;
          }
        }
      } if (n === 21) {
        window.open("https://iaar.glitch.me/","_self")
        n = 200;
      }
      //if (m <= 20) {
        //if (obj.length !== 0) {
          //if (x['class'] == "cell phone") {
            //m = m + 1;
          //}
        //}
      //} if (m === 21) {
        //window.open("https://iaar.glitch.me/src/pages/detectedModels.html#oxxo","_self")
        //m = 200;
      //} 
      //if (k <= 20) {
        //if (obj.length !== 0) {
          //if (x['class'] == "cup") {
            //k = k+ 1;
          //}
        //}
      //} if (k === 21) {
        //window.open("https://iaar.glitch.me/src/pages/detectedModels.html#torre","_self")
        //k = 200;
      //}
      //if (z <= 20) {
        //if (obj.length !== 0) {
          //if (x['class'] == "scissors") {
            //z = z + 1;
          //}
        //}
      //} if (z === 21) {
        //window.open("https://iaar.glitch.me/src/pages/detectedModels.html#angel","_self")
        //z = 200;
      //}
      
      
      

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
