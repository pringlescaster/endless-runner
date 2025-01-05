"use client";

import React from "react";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const player = { x: 50, y: 300, width: 50, height: 50, dy: 0 }; //dy is used for the vertical jump of the player, dy is change of directon but in the vertical axis
    const gravity = 0.5;

    function drawPlayer() {
      //draw a rectangle player
      ctx.fillStyle = "blue";
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function handleJump() {
      if (player.y === 300) {
        player.dy = -10 //jump height
      }
    }

    function update() {
      player.dy += gravity; // Apply gravity to the player's vertical velocity
      player.y += player.dy  // Update the player's vertical position based on velocity

      //stop player at the ground
      if(player.y > 300){
        player.y = 300; // makes the player stand on the ground instead of sinking
        player.dy = 0 //prevents the player from accelerating downwards
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw a ground line
    ctx.fillStyle = "green";
    ctx.fillRect(0, 350, canvas.width, 50);

    //draw player
    drawPlayer()

    
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
