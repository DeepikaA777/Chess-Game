const board = document.getElementById("board");

// chessboard
for (let row = 8; row >= 1; row--) {
  for (let col = 1; col <= 8; col++) {
    const box = document.createElement("div");
    box.id = `b${row * 100 + col}`;
    box.className = `box ${(row + col) % 2 === 0 ? "white" : "black"}`;
    board.appendChild(box);
  }
}

const setup = {
  8: ["Brook", "Bknight", "Bbishop", "Bqueen", "Bking", "Bbishop", "Bknight", "Brook"],
  7: ["Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn", "Bpawn"],
  2: ["Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn", "Wpawn"],
  1: ["Wrook", "Wknight", "Wbishop", "Wqueen", "Wking", "Wbishop", "Wknight", "Wrook"],
};

// chess pieces
for (let row in setup) {
  setup[row].forEach((piece, i) => {
    const box = document.getElementById(`b${row * 100 + (i + 1)}`);
    box.innerHTML = `<img class='all-img' src="images/${piece}.png" alt="${piece}">`;
    box.dataset.piece = piece;
  });
}

let selectedBox = null;
let currentTurn = "white"; //white moves first

board.addEventListener("click", (e) => {
  const target = e.target.closest(".box");
  if (!target) return;

  const piece = target.dataset.piece;
  const pieceColor = piece ? (piece.startsWith("W") ? "white" : "black") : null;

  // Selecting a piece
  if (piece) {
    if (pieceColor !== currentTurn) return; //current player's turn
    clearHighlights();
    selectedBox = target;
    highlightMoves(target);
  } 
  // Moving a piece
  else if (selectedBox) {
    const fromColor = selectedBox.dataset.piece.startsWith("W") ? "white" : "black";
    if (fromColor !== currentTurn) return;

    target.innerHTML = selectedBox.innerHTML;
    target.dataset.piece = selectedBox.dataset.piece;

    selectedBox.innerHTML = "";
    delete selectedBox.dataset.piece;

    clearHighlights();
    selectedBox = null;

    //Switch turns
    currentTurn = currentTurn === "white" ? "black" : "white";
  }
});

function clearHighlights() {
  document.querySelectorAll(".box").forEach((b) => (b.style.outline = "none"));
}

function highlightMoves(box) {
  box.style.outline = "3px solid greenyellow";
  const piece = box.dataset.piece;
  const boxId = parseInt(box.id.replace("b", ""));
  const row = Math.floor(boxId / 100);
  const col = boxId % 100;

  // paw movement rules
  if (piece === "Wpawn") {
    highlightBox(row + 1, col); // White pawns move upward 
  } else if (piece === "Bpawn") {
    highlightBox(row - 1, col); // Black pawns move downward
  }
}

function highlightBox(row, col) {
  const target = document.getElementById(`b${row * 100 + col}`);
  if (target) target.style.outline = "3px solid yellow";
}
