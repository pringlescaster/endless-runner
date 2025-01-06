"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [startGame, setstartGame] = useState(false);

  const start = () => {
    setstartGame(true);
  };

  useEffect(() => {
    if (!startGame) return; // Run the effect only when the game starts

    const opponents = [];
    const opponentsFrequency = 120; // how many steps the player can take before a new opponent is created
    let frameCount = 0; // counts the number of steps the player has taken

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    const player = { x: 50, y: 300, width: 50, height: 50, dy: 0, dx: 0 };
    const gravity = 0.5;
    const speed = 5;

    const platform = { x: 200, y: 250, width: 400, height: 20 };

    function drawPlayer() {
      ctx.fillStyle = "blue";
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawPlatform() {
      ctx.fillStyle = "brown";
      ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    function handleJump() {
      if (player.y === 300) {
        player.dy = -10; // jump height
      }
    }

    // Function to spawn new opponent
    function spawnOpponent() {
      const size = 50;
      const y = 300 - size; // i.e 300 - 50 = 250 which means the opponent won't sink
      const x = canvas.width; // spawn at the right edge of the canvas
      const speed = 5; // speed of the opponent

      opponents.push({ x, y, width: size, height: size, speed });
    }

    // Function to draw the opponents
    function drawOpponents() {
      ctx.fillStyle = "red";
      opponents.forEach((opponent) => {
        ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
      });
    }

    function update() {
      player.dy += gravity;
      player.y += player.dy;

      player.x += player.dx;

      if (
        player.y + player.height > platform.y &&
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width
      ) {
        player.y = platform.y - player.height;
        player.dy = 0;
      }

      if (player.y > 300) {
        player.y = 300;
        player.dy = 0;
      }

      if (player.x < 0) {
        player.x = 0;
      }

      if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
      }

      frameCount++; // update the frame count, frame count is the number of frames that have passed since the game started

      // frameCount % opponentsFrequency === 0, checks for the number of frames that have passed and divides it by the opponent frequency,
      // if the remainder is === 0, the enemy respawns
      if (frameCount % opponentsFrequency === 0) {
        spawnOpponent(); // Spawn new opponent when frameCount is a multiple of opponentsFrequency
      }

      opponents.forEach((opponent, index) => {
        opponent.x -= opponent.speed;

        if (opponent.x + opponent.width < 0) {
          opponents.splice(index, 1); // remove the opponent when it goes off-screen
        }
      });

      // Check for collisions
      opponents.forEach((opponent) => {
        if (
          player.y < opponent.y + opponent.height &&
          player.y + player.height > opponent.y &&
          player.x < opponent.x + opponent.width &&
          player.x + player.width > opponent.x
        ) {
          // Collision detected, game over
          setstartGame(false);
          alert("Game Over!");
          window.location.reload(); // Reload the page to restart the game
        }
      });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.fillStyle = "green";
      ctx.fillRect(0, 350, canvas.width, 50);

      drawPlayer();
      drawPlatform();
      drawOpponents();

      requestAnimationFrame(update);
    }

    update();

    // Event listeners
    function handleKeyDown(e) {
      if (e.code === "Space") handleJump();
      if (e.code === "ArrowRight") player.dx = speed;
      if (e.code === "ArrowLeft") player.dx = -speed;
    }

    function handleKeyUp(e) {
      if (e.code === "ArrowRight" || e.code === "ArrowLeft") player.dx = 0;
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [startGame]); // Re-run effect only when startGame changes

  if (!startGame) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <button
          onClick={start}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <canvas
        id="gameCanvas"
        width="800"
        height="400"
        className="border"
      ></canvas>
    </div>
  );
}
