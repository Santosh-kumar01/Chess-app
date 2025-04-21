const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const getPieceUnicode = (piece) => {
  const symbols = {
    w: { p: "♙", r: "♖", n: "♘", b: "♗", q: "♕", k: "♔" },
    b: { p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚" },
  };
  return symbols[piece.color][piece.type];
};

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";

  board.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      const squareEl = document.createElement("div");
      squareEl.classList.add(
        "square",
        (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"
      );
      squareEl.dataset.row = rowIndex;
      squareEl.dataset.col = colIndex;

      if (square) {
        const pieceEl = document.createElement("div");
        pieceEl.className = `piece ${square.color === "w" ? "white" : "black"}`;
        pieceEl.innerText = getPieceUnicode(square);

        if (square.color === playerRole) {
          pieceEl.draggable = true;
          pieceEl.addEventListener("dragstart", (e) => {
            draggedPiece = pieceEl;
            sourceSquare = { row: rowIndex, col: colIndex };
            e.dataTransfer.setData("text/plain", "");
          });
          pieceEl.addEventListener("dragend", () => {
            draggedPiece = null;
            sourceSquare = null;
          });
        }

        squareEl.appendChild(pieceEl);
      }

      squareEl.addEventListener("dragover", (e) => e.preventDefault());
      squareEl.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece && sourceSquare) {
          const targetSquare = {
            row: parseInt(e.currentTarget.dataset.row),
            col: parseInt(e.currentTarget.dataset.col),
          };
          handleMove(sourceSquare, targetSquare);
        }
      });

      boardElement.appendChild(squareEl);
    });
  });

  if (playerRole === "b") {
    boardElement.classList.add("flipped");
  } else {
    boardElement.classList.remove("flipped");
  }
};

const handleMove = (source, target) => {
  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q",
  };
  socket.emit("move", move);
};

socket.on("playerRole", (role) => {
  playerRole = role;
  renderBoard();
});

socket.on("spectatorRole", () => {
  playerRole = null;
  renderBoard();
});

socket.on("boardstate", (fen) => {
  chess.load(fen);
  renderBoard();
});

socket.on("move", (move) => {
  chess.move(move);
  renderBoard();
});

renderBoard();
