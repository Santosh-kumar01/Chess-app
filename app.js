const express = require("express");
const socket = require("socket.io");
const http = require("http");
const path = require("path");
const { Chess } = require("chess.js");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Chess Game" });
});

io.on("connection", (uniquesocket) => {
  console.log("User connected:", uniquesocket.id);

  // Assign player roles
  if (!players.white) {
    players.white = uniquesocket.id;
    uniquesocket.emit("playerRole", "w");
  } else if (!players.black) {
    players.black = uniquesocket.id;
    uniquesocket.emit("playerRole", "b");
  } else {
    uniquesocket.emit("spectatorRole");
  }

  uniquesocket.emit("boardstate", chess.fen());

  uniquesocket.on("move", (move) => {
    try {
      const currentTurn = chess.turn(); // 'w' or 'b'
      const playerId = currentTurn === 'w' ? players.white : players.black;

      if (uniquesocket.id !== playerId) return;

      const result = chess.move(move);

      if (result) {
        io.emit("move", move);
        io.emit("boardstate", chess.fen());
      } else {
        uniquesocket.emit("invalidMove", move);
      }
    } catch (error) {
      console.error("Move error:", error);
      uniquesocket.emit("invalidMove", move);
    }
  });

  uniquesocket.on("disconnect", () => {
    console.log("User disconnected:", uniquesocket.id);
    if (players.white === uniquesocket.id) delete players.white;
    if (players.black === uniquesocket.id) delete players.black;
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});