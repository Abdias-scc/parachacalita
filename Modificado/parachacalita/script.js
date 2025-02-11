const rows = 4, cols = 4;
const piecesContainer = document.getElementById('pieces-container');
const puzzleBoard = document.getElementById('puzzle-board');
const questionContainer = document.getElementById('question-container');
const congratulations = document.getElementById('congratulations');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let draggedPiece = null;

// Generar las piezas del rompecabezas
function createPuzzlePieces() {
    const pieces = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.draggable = true;
            piece.dataset.position = `${x}-${y}`;
            piece.style.backgroundPosition = `-${x * 80}px -${y * 80}px`;

            piece.addEventListener('dragstart', () => {
                draggedPiece = piece;
            });

            piece.addEventListener('dragend', () => {
                draggedPiece = null;
            });

            pieces.push(piece);
        }
    }

    // Desordenar las piezas
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach(piece => piecesContainer.appendChild(piece));
}

// Configurar el tablero
function setupPuzzleBoard() {
    for (let i = 0; i < rows * cols; i++) {
        const dropZone = document.createElement('div');
        dropZone.classList.add('piece-slot');
        dropZone.dataset.position = `${i % cols}-${Math.floor(i / cols)}`;

        dropZone.addEventListener('dragover', (e) => e.preventDefault());

        dropZone.addEventListener('drop', () => {
            if (draggedPiece) {
                dropZone.appendChild(draggedPiece);
                checkPuzzleComplete();
            }
        });

        puzzleBoard.appendChild(dropZone);
    }
}

// Verificar si el rompecabezas está completo
function checkPuzzleComplete() {
    const slots = puzzleBoard.querySelectorAll('.piece-slot');

    const allCorrect = [...slots].every(slot => {
        const piece = slot.querySelector('.piece');
        if (!piece) return false;

        const correctPos = slot.dataset.position;
        return piece.dataset.position === correctPos;
    });

    if (allCorrect) {
        showCongrulatulations();
    }
}

function showCongrulatulations() {
    document.getElementById('game-container').style.display = 'none';
    document.querySelector('.title').style.display = 'none';
    document.getElementById('congratulations-container').style.display = 'block';
}
// Botones de la pregunta
document.getElementById('yes-btn').addEventListener('click', function() {
    const finalMessage = document.getElementById('final-message');
    finalMessage.innerHTML = `
    <img src="mocha5final.gif" class="sticker-img">
    Sabías que dirías que siii jijiji <br> 
    <span style="font-size: 30px;">TE AMOO</span>
`;
    finalMessage.style.display = 'block';
    finalMessage.style.animation = 'none'
    void finalMessage.offsetHeight;
    finalMessage.style.animation = 'showMessage 0.5s ease-out forwards';
});



// ========== SECCIÓN MODIFICADA (botón No) ==========
function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// Mover al acercar el mouse
noBtn.addEventListener('mouseover', moveNoButton);

// Mover también al hacer clic (por si acaso)
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    moveNoButton();
});

// ... (el resto del código se mantiene igual)
// Inicializar el juego
createPuzzlePieces();
setupPuzzleBoard();
