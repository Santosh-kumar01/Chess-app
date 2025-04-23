
<div align="center">

<!-- <img src="https://your-logo-url-or-banner.png" width="80%" /> -->

# ♟️ Chess-app – Real-Time app Chess Game

</div>

---

## 🖥️ App Overview ♛ 

Chess-app is a real-time multiplayer web application that brings the classic strategy game of chess to your browser. It is designed for two players to play live, taking alternating turns, with full enforcement of official chess rules and game conditions

Designed with the complexities of large-scale offline events in mind, it centralizes live feedback, analyzes emotions across multiple platforms, and provides actionable insights — ensuring every concern is seen, heard, and resolved.

--

## 🖥️ System Overview

🕰️ Real-Time Gameplay: Built with Express.js, and Socket.IO, the app allows two players to join and play against each other live.

🤳 Drag-and-Drop Interface: Players can move pieces interactively using a smooth drag-and-drop system built with HTML, CSS, and JavaScript. 

♟️ Game Engine: Powered by Chess.js, ensuring all chess logic and move validation are handled correctly. 

🙍🏻‍♂️ Player Roles: When two users join, they are automatically assigned roles — White or Black. 

📱 Live Synchronization: All board states and moves are updated in real-time for both players. 

 -- 

## 📜 Game Rules and Logic
	•	♟️ Two Players Only: The game starts when both White and Black players are connected.
	•	🔄 Turn-Based System: Players take alternating turns; only the active player can move.
 	•	✅ Move Validation: Every move is validated using chess.js to ensure it follows standard chess rules.

--

##	🛡️ Game Conditions:

Check:- The king is in danger but can escape. 


Checkmate:- The king is under threat and cannot escape — the game ends.

Draw:- Detected based on stalemate, insufficient material, repetition, or the 50-move rule.

---

## 🚀 Core Features

| Feature | Description |
|--------|-------------|
|  🎮 **Real-Time Multiplayer** | Play live with another player with instant move synchronization using Socket.IO.|
|  🔄 **Turn-Based System** | Players take alternating turns; only one can move at a time. |
|  ♟️ **Drag-and-Drop Interface** | Move pieces smoothly using an intuitive drag-and-drop UI. |
|  ✅ **Rule Validation** | All moves are validated using chess.js to ensure legal play. |
|  🏁 **Endgame Detection** | Automatically detects check, checkmate, stalemate, and draw scenarios. |
|  👥 **Automatic Role Assignment** | Players are automatically assigned as White or Black when they join. |
|  📱 **Responsive Design** | Fully responsive layout for both desktop and mobile browsers. |

---

## 🛠️ Built With

| Technology| Purpose |
|---------|--------|
| **Express.js** | Backend framework for handling routes, game logic, and server setup |
| **javaScript** | Type-safe language for writing clean, maintainable backend and frontend code |
| **Socket.IO** | Enables real-time communication between players for synchronized gameplay |
| **Tailwind CSS** | Utility-first CSS framework for building a responsive and modern UI |
| **Render** | Cloud platform used for deploying the full-stack application |


---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Santosh-kumar01/Chess-app.git

# Navigate to project directory
cd chess

# Start backend Server running
npx nodemon
