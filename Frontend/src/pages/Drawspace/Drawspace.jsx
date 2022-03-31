import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import "./drawspace.css";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Drawspace = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socket = io.connect("http://localhost:8080/");

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext("2d");
    const resetButton = document.getElementById("resetButton");
    const saveButton = document.getElementById("saveButton");

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");
    // set the current color
    const current = {
      color: "black",
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;

      socket.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX;
      current.y = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }
      drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
      current.x = e.clientX;
      current.y = e.clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);
    // -------------- make the canvas fill its parent component -----------------

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    const handleResetCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      handleSaveCanvas();
      console.log("reset");
    };

    const handleSaveCanvas = () => {
      let imgURL = canvas.toDataURL();
      socket.emit("save", imgURL);
    };

    resetButton.onclick = handleResetCanvas;
    saveButton.onclick = handleSaveCanvas;

    socket.on("drawing", onDrawingEvent);

    socket.on("load", (imgURL) => {
      console.log(imgURL);
      let img = new Image(canvas.width, canvas.height);
      img.src = imgURL;
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
    });
  }, []);


  return (
    <div>
      <canvas ref={canvasRef} className="whiteboard" />
      <img src="" alt="" id="canvasImg" />
      <div className="savereset">
        <IconButton id="resetButton">
          <RestartAltIcon />
        </IconButton>
        <IconButton id="saveButton">
          <SaveIcon />
        </IconButton>
      </div>
      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
      </div>
    </div>
  );
};

export default Drawspace;