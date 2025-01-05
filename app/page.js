"use client";

import React from "react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const player = { x: 50, y: 300, width: 50, height: 50, dy: 0, dx: 0 }; //dy is used for the vertical jump of the player, dy is change of directon but in the vertical axis
    const gravity = 0.5;
    const speed = 5

    const platform = { x: 200, y: 250, width: 400, height: 20}

    function drawPlayer() {
      //draw a rectangle player
      ctx.fillStyle = "blue";
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }


    function drawPlatform(){
ctx.fillStyle = "brown";
ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }



    function handleJump() {
      if (player.y === 300) {
        player.dy = -10 //jump height
      }
    }

    function handleMovement() {
      if (e.code === "ArrowRight") {
        player.dx = speed;
      }
      else if (e.code === "ArrowLeft") {
        player.dx = -speed;
      }
    }

    function toStopMovement(e) {
      if (e.code === "ArrowRight" || e.code === "ArrowLeft")
 {
  player.dx = 0;
 }
    }

    function update() {
      player.dy += gravity; // Apply gravity to the player's vertical velocity
      player.y += player.dy  // Update the player's vertical position based on velocity

      player.x += player.dx // Update the player's horizontal position based on velocity

      //stop player at the ground
      if(player.y > 300){
        player.y = 300; // makes the player stand on the ground instead of sinking
        player.dy = 0 //prevents the player from accelerating downwards
      }

      if(player.x < 0) {
        player.x = 0;
      }

      if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the entire canvas and display new one

    // draw a ground line
    ctx.fillStyle = "green";
    ctx.fillRect(0, 350, canvas.width, 50);

    //draw player
    drawPlayer()
    drawPlatform()

    requestAnimationFrame(update); //schedule the next frame to update

    update();

    //event listener for jumping
    //keydown happens when you continuosly press the space button and keyup is just you releasing the space button?
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        handleJump();
      }
    })

    //clean up the event listener
    return () => {
      window.removeEventListener("keydown", handleJump);
    };
    // this is called whenever the component unmounts, it cleans up any event listeners or timers
    
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <canvas
        id="gameCanvas"
        width="800"
        height="400"
        className="border"
      ></canvas>
    </div>
  );
}
